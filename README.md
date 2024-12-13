# TODO list
Implementation of the [ROADMAP.sh project idea](https://roadmap.sh/projects/todo-list-api)

## Starting project

- Set up your environment
    - Node.js (version 20 or bigger)
    - Git
    - Docker

- Clone the repository
```bash
git clone https://github.com/AugustoPreis/todolist.git
cd todolist
```

- In the root `todolist` folder, create a `.env` file with the following content
```env
PORT=3000 #Backend port

JWT_SECRET= #Random SHA256

JWT_EXPIRES_IN=1d #Login duration

ENCRYPTION_KEY= #Random SHA256

# Database config (avoid change)
DB_HOST=localhost
DB_NAME=todolist
DB_USER=postgres
DB_PASS=postgres
DB_PORT=5432
```

- Start the database
```bash
docker-compose up --build
```

- Run the project
```bash
npm install
npm run dev
```

- The project must be running at the port configured in the `.env` file