# DC Villains and Anti-heroes API

Open Source REST API listing villains and anti-heroes published by DC Comics.

Data scrapped from [akabab/superhero-api](https://github.com/akabab/superhero-api).

## Available endpoints

### Get all characters
```bash
curl https://rosariopfernandes.github.io/dc-villains-api/all/
```

### Get characters with pagination
This returns 10 characters per page. It uses the
 [cursoring](https://developer.twitter.com/en/docs/basics/cursoring)
 technique.
```bash
curl https://rosariopfernandes.github.io/dc-villains-api/cursor/

# to call the next page:
curl https://rosariopfernandes.github.io/dc-villains-api/cursor/{next_cursor}/
```

### Get character by id

```bash
curl https://rosariopfernandes.github.io/dc-villains-api/id/{id}/
# eg. curl https://rosariopfernandes.github.io/dc-villains-api/id/20/
```

## Contributing with more characters

1. Check if the character has an ID on the [superheroapi](https://superheroapi.com/ids.html).
2. If it doesn't, choose an ID higher than 731. I recommend checking the [id/](/id) directory
 and incrementing the last id (ascending order).
3. Create a new directory under the [id/](/id) directory and add an `index.json` file:
    ```bash
    mkdir id/{YOUR_CHARACTER_ID}
    touch id/{YOUR_CHARACTER_ID}/index.json
    ```
4. Add the character data to the index.json file and run the generator:
   ```bash
    node generator/index.js
    ```
5. Commit the file you created and the generated files and send a PR. 

## License

[MIT License](LICENSE)
