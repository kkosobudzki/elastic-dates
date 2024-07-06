# elastic-dates

## Usage
Library does not depend neither on window nor or any third party libraries, thus it is safe to use it in both browser and node-like environment.

### Time units
* `d` day
* `M` month
* `y` year
* `h` hour
* `m` minute
* `s` second
* `w` week

### Parse
In order to convert human friendly date like `now-1d` to calendar date use `parse` funciton.

#### Supported format:
1. relative date prefix - `now` (required)
2. date-time differences - `-1d`, `+5h`, `-8M` etc, multiple values are supported (optional)
3. rounding (optional) - only one rounding unit can be provided as these are exclusive - `y`, `M` etc.

#### Examples:
Given the current date and time is `2024-05-01T00:00:00.000Z`:

`now-1y/y`  -> `2023-01-01T00:00:00.000Z` - now minus one year rounded to the nearest year
`now/y`     -> `2023-01-01T00:00:00.000Z` - now rounded to the nearest year
`now-1d`    -> `2024-04-30T00:00:00.000Z` - now minus 1 day
`now+1d`    -> `2024-05-02T00:00:00.000Z` - now add 1 day
`now-4d-4h` -> `2024-04-26T20:00:00.000Z` - now minus four days and four hours

### Stringify
Converts calendar date to human friendly date like `now-1d`. See (Supported format)[#supported-format] and (Examples)[#examples].

### Build
`bun build index.ts --minify --outdir dist`
