const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

async function hashPassword() {
    var name = "CHANH TIN";
    var email = "votin390@gmail.com";
    var password = "12345";

    try {
        var hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        // Further code to store hashedPassword in the database or perform other actions.

        pool.query(`INSERT INTO users (name, email, password)
                    VALUES ($1, $2, $3)
                    RETURNING id, password`,
        [name, email, hashedPassword]
        , (err, results) => {
            if (err)
                throw err

            console.log(results.rows)
        })
    } catch (error) {
        console.error("Error hashing password:", error);
    }
}

// Call the async function
hashPassword();
