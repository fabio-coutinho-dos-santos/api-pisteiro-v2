db.createUser(
    {
        user: "pisteiro",
        pwd: "impostoeroubo",
        roles: [
            {
                role: "readWrite",
                db: "pisteiro-admin"
            }
        ]
    }
);