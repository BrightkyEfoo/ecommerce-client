# Ecommerce Web App FRONTEND
  You can go to the root repository project [here](https://github.com/BrightkyEfoo/ecommerce)
## Getting Started

### Prerequisites
Make sure you have an instance of [api-server](https://github.com/BrightkyEfoo/ecommerce-server) which is running

### Dev
First ensure that you have nodeJs and npm installed on your machine, If not you can see how to get them installed [here](https://nodejs.org/en/download/current)
Clone repo first, then open a terminal at the root of the project and then run the command
then install all dependencies with
```bash
npm i
```
After this start the project by running the command
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you want run prod server make sure you get docker in your machine and run the commande :
make sure that your port 80 on your machine is free to use.

If not, edit the docker-compose file [here](docker-compose.yml) and then change the 80 with the new port you want use at the line 9
```bash
docker compose -f docker-compose.yml up -d
```
And then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## SiteMap

| NAME                   | URL-PATTERN                         | EXAMPLE                                                  | AVAILABILITY |
|------------------------|-------------------------------------|----------------------------------------------------------|--------------|
| home                   | /                                   |                                                          | available    |
| products               | /products                           |                                                          | available    |
| one product            | /products/:product-slug             | /products/661d45f1b5d23b69bd88a89a                       | available    |
| categories             | /categories                         |                                                          | available    |
| one category           | /categories/:category-slug          | /categories/Networking-661d4730d9f85cc146ddb87d          | available    |
| products of a category | /categories/:category-slug/products | /categories/Networking-661d4730d9f85cc146ddb87d/products | available    |
| login                  | /auth/login                         |                                                          | available    |
| register               | /auth/register                      |                                                          | available    |
| cart                   | /dashboard/cart                     |                                                          | available    |
| profile                | /dashboard/profile                  |                                                          | unavailable  |
| dashboard              | /dashboard                          |                                                          | unavailable  |

## Deployed version
The website is available online [here](http://5.189.158.182)

## Credentials
If you want to use application with an account you can register or directly use admin credentials

| EMAIL                 | PASSWORD     |
|-----------------------|--------------|
| brightefoo@gmail.com  | brightkyefoo |


`@BrightkyEfoo`
