# SMART WAREHOUSE BACKEND

**Smart Warehouse** is a web application for keeping track of things.
In this application, you can enter, for example, rooms, boxes, shelves
and their capacity, after that you can also add/delete/update items there.

### Smart Warehouse team members:
Julia Djomina

### "How do I access your website?"

1. PLease clone [backend repository](https://github.com/Juliadjomina/smart-warehouse-back-end) as well as this frontend repository.
2. Our SQL database is resided in the Docker. Please build the Docker image as following:
  - `docker compose up -d`
3. When the database is up and running, go to `src\main\java\net\group\warehouse\SmartWarehouseApplication.java` in the backend repo and run the
   `SmartWarehouseApplication` file.
4. Congrats! Backend is now running on `localhost:8080`.
5. Only when the backend is all set up and running, you can run frontend.
   Please open the frontend repository in your terminal and run `ng serve`. Our website will open on `localhost:4200`.
