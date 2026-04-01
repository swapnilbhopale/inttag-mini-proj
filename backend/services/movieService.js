const { v4: uuidv4 } = require("uuid");
const driver = require("../config/neo4j");
const logger = require("../utils/logger");

exports.createMovie = async (req, res) => {
  const {
    title,
    slug,
    synopsis,
    genres = [],
    language,
    durationMinutes,
    releaseDate,
    productionStatus,
    visibility,
    director,
    cast = [],
    posterUrl,
    tags = [],
    isArchived = false,
    createdBy
  } = req.body;

  const session = driver.session();

  try {
    logger.info(`Create Movie API Call for slug: ${slug}`);

    // 1. Check slug uniqueness
    const existing = await session.run(
      `MATCH (m:Movie {slug: $slug}) RETURN m`,
      { slug }
    );

    if (existing.records.length > 0) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    // 2. title validations
    if (!title || title.length < 2 || title.length > 120) {
      return res.status(400).json({ message: "Invalid title" });
    }

    if (!synopsis) {
      return res.status(400).json({ message: "Synopsis is required" });
    }

    if (!language) {
      return res.status(400).json({ message: "Language is required" });
    }

    if (!durationMinutes || durationMinutes <= 0) {
      return res.status(400).json({ message: "Invalid duration" });
    }

    //  ENUM validation
    const validProductionStatus = [
      "ANNOUNCED",
      "PRE_PRODUCTION",
      "FILMING",
      "POST_PRODUCTION",
      "RELEASED"
    ];

    const validVisibility = ["DRAFT", "PRIVATE", "PUBLISHED"];

    if (!validProductionStatus.includes(productionStatus)) {
      return res.status(400).json({ message: "Invalid productionStatus" });
    }

    if (!validVisibility.includes(visibility)) {
      return res.status(400).json({ message: "Invalid visibility" });
    }

    const movieId = uuidv4();

    //  3. Create Movie Node
    await session.run(
      `
      CREATE (m:Movie {
        id: $id,
        title: $title,
        slug: $slug,
        synopsis: $synopsis,
        language: $language,
        durationMinutes: $durationMinutes,
        releaseDate: $releaseDate,
        productionStatus: $productionStatus,
        visibility: $visibility,
        posterUrl: $posterUrl,
        isArchived: $isArchived,
        version: 1,
        createdAt: datetime(),
        updatedAt: datetime()
      })
      `,
      {
        id: movieId,
        title,
        slug,
        synopsis,
        language,
        durationMinutes: parseInt(durationMinutes),
        releaseDate: releaseDate ? new Date(releaseDate) : null,
        productionStatus,
        visibility,
        posterUrl,
        isArchived
      }
    );

    //  4. createdBy relation
    if (createdBy) {
      await session.run(
        `
        MATCH (m:Movie {id: $movieId})
        MATCH (u:User {id: $userId})
        MERGE (u)-[:CREATED]->(m)
        `,
        { movieId, userId: createdBy }
      );
    }

    //  5. Genres
    for (const genre of genres) {
      await session.run(
        `
        MATCH (m:Movie {id: $id})
        MERGE (g:Genre {name: $genre})
        MERGE (m)-[:HAS_GENRE]->(g)
        `,
        { id: movieId, genre }
      );
    }

    //  6. Cast
    for (const actor of cast) {
      await session.run(
        `
        MATCH (m:Movie {id: $id})
        MERGE (p:Person {name: $actor})
        MERGE (m)-[:ACTED_IN]->(p)
        `,
        { id: movieId, actor }
      );
    }

    //  7. Director
    if (director) {
      await session.run(
        `
        MATCH (m:Movie {id: $id})
        MERGE (d:Person {name: $director})
        MERGE (m)-[:DIRECTED_BY]->(d)
        `,
        { id: movieId, director }
      );
    }

    //  8. Tags
    for (const tag of tags) {
      await session.run(
        `
        MATCH (m:Movie {id: $id})
        MERGE (t:Tag {name: $tag})
        MERGE (m)-[:HAS_TAG]->(t)
        `,
        { id: movieId, tag }
      );
    }

    logger.info(`Movie created successfully: ${slug}`);

    res.status(201).json({
      message: "Movie created successfully",
      movieId
    });

  } catch (err) {
    logger.error(`Error in create Movie API: ${err.message}`);
    res.status(500).json({ message: err.message });

  } finally {
    await session.close();
    logger.info(`Neo4j session closed for slug: ${slug}`);
  }
};


exports.getAllMovies = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (m:Movie {isArchived: false})
      RETURN m
      ORDER BY m.createdAt DESC
      `
    );

    const movies = result.records.map(record => record.get("m").properties);

    res.json(movies);

  } catch (err) {
    res.status(500).json({ message: err.message });

  } finally {
    await session.close();
  }
};