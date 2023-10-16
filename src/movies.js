// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  let onlyDirectors = moviesArray.map((eachMovie) => eachMovie.director);
  return onlyDirectors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }
  let onlySpielbergMovies = moviesArray.filter((movie) => {
    if (movie.director === "Steven Spielberg") {
      return true;
    } else {
      return false;
    }
  });

  if (onlySpielbergMovies.length === 0) {
    return 0;
  }

  let dramaSpielberg = onlySpielbergMovies.filter((movie) => {
    if (movie.genre.includes("Drama")) {
      return true;
    } else {
      return false;
    }
  });
  return dramaSpielberg.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }
  let average = moviesArray.reduce((acc, movie) => {
    if (!movie.score) {
      return acc;
    } else {
      return movie.score + acc;
    }
  }, 0);
  return Math.round((average / moviesArray.length) * 100) / 100;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  let dramaMovies = moviesArray.filter((movie) => {
    if (movie.genre.includes("Drama")) {
      return true;
    } else {
      return false;
    }
  });
  let average = scoresAverage(dramaMovies);
  return average;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  let copyMoviesArray = moviesArray.slice(0);
  return copyMoviesArray.sort((mov1, mov2) => {
    if (mov1.year < mov2.year) {
      return -1;
    } else if (mov1.year > mov2.year) {
      return 1;
    } else {
      if (typeof mov1.title === "string" && typeof mov2.title === "string") {
        return mov1.title.localeCompare(mov2.title);
      } else {
        return mov1.year;
      }
    }
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  let copyMoviesArray = moviesArray.slice(0);
  copyMoviesArray.sort((mov1, mov2) => {
    if (mov1.title.localeCompare(mov2.title) < 0) {
      return -1;
    } else if (mov1.title.localeCompare(mov2.title) > 0) {
      return 1;
    } else {
      return mov1.title.localeCompare(mov2.title);
    }
  });
  let onlyTitle = copyMoviesArray.slice(0, 20).map((eachMovie) => {
    return eachMovie.title;
  });
  return onlyTitle;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  let copyMoviesArray = JSON.parse(JSON.stringify(moviesArray));
  let durationFixed = copyMoviesArray.map((eachMovie) => {
    let hDuration = parseInt(eachMovie.duration.replace("h", ""));
    let min = eachMovie.duration.replace(hDuration + "h", "");
    let tDuration;
    if (eachMovie.duration.includes("h") && hDuration !== 0) {
      if (min) {
        let mDuration = parseInt(min.replace("min", ""));
        tDuration = parseInt(hDuration * 60 + mDuration);
      } else {
        tDuration = parseInt(hDuration * 60);
      }
      eachMovie.duration = parseInt(tDuration);
      return eachMovie;
    } else {
      let hDuration = eachMovie.duration.replace("0h", "");
      let mDuration = hDuration.replace("min", "");
      eachMovie.duration = parseInt(mDuration);
      return eachMovie;
    }
  });
  return durationFixed;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) {
    return null;
  }
  let copyMoviesArray = orderByYear(JSON.parse(JSON.stringify(moviesArray)));
  let arrYearMovie = copyMoviesArray.map((movie) => {
    return { year: movie.year, score: movie.score };
  });

  const arrayMovies = [];
  arrYearMovie.forEach((eachMovie) => {
    if (arrayMovies[eachMovie.year]) {
      arrayMovies[eachMovie.year].sum += eachMovie.score;
      arrayMovies[eachMovie.year].count++;
    } else {
      arrayMovies[eachMovie.year] = { sum: eachMovie.score, count: 1 };
    }
  });

  let highestScore = 0;
  let highestScorePerYear = 0;
  let yearMaxScore = 0;
  for (const año in arrayMovies) {
    highestScorePerYear = arrayMovies[año].sum / arrayMovies[año].count;
    if (highestScorePerYear > highestScore) {
      yearMaxScore = año;
      highestScore = highestScorePerYear;
    } else if (highestScorePerYear === highestScore) {
      if (año < yearMaxScore) {
        yearMaxScore = año;
        highestScore = highestScore;
      } else {
        yearMaxScore = yearMaxScore;
        highestScore = highestScorePerYear;
      }
    }
  }

  return `The best year was ${yearMaxScore} with an average score of ${highestScore}`;
}
