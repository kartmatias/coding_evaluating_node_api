# customer-api-m
This is a Moleculer-based microservices project.

## Usage
Start the project with `npm run dev` command. 
After starting, open the http://localhost:3000/ URL in your browser. 
On the welcome page you can test the generated services via API Gateway and check the nodes & services.

In the terminal, try the following commands:
- `nodes` - List all connected nodes.
- `actions` - List all registered service actions.
- `call greeter.hello` - Call the `greeter.hello` action.
- `call greeter.welcome --name John` - Call the `greeter.welcome` action with the `name` parameter.
- `call customers.list` - List the customers (call the `customers.list` action).

## Services
- **api**: API Gateway services
- **greeter**: Service with `hello` and `welcome` actions.
- **customers**: DB service.

## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose
