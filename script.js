
//A Movie Renting API.
class MovieStore {
    
    static lateFee = 12
    static borrowWindow = 3
    isLoggedIn = false
    static genre = ["action", "comedy", "horror", "drama"]
    static customers = []

    static movies = [
        { genre: "action", movieTitle: "carter", description: "A man wakes up missing his memories. Directed by a mysterious voice from a device in his ear, he sets off on a hostage rescue mission rife with danger.", rating: 5.5, id: 1111, rentPrice: 100},
        { genre: "comedy", movieTitle: "family switch", description: "When family members switch bodies with eachother during rare planetry alignment, their hilarious journey to find their way back to normal.", rating: 9.1, id: 2222, rentPrice:100},
        { genre: "horror", movieTitle: "the haunting shadows", description: "an errie and desolate mansion becomes the backdrop for unexplained phenomena. As a group of friends embarks on a weekend getaway, they soon realise that the mnsion harbors a dark secret.", rating: 7.1, id: 3333, rentPrice:100},
        { genre: "romance", movieTitle: "whispers of love", description: "a chance encounter between two strangers blossoms into a captivating romance that transcends time and societal expectations.", rating: 8.9, id: 4444, rentPrice:100}
    ]

    constructor(username, password) {
        this.username = username
        this.password = password
    }

    login(username, password) {
        if (this.username == username && this.password == password) {
            console.log(`You successfully logged in.`)
            this.isLoggedIn = true
            return
        }
        // console.log(`invalid credentials`)
        this.isLoggedIn = false
    }

    logout() {
        this.username = undefined
        this.password = undefined
        this.isLoggedIn = false
        console.log(`You successfully logged out.`)
    }

    //you can see list of movies without logging in.
    static listMovies() {
        console.log(`AVAILABLE MOVIES:\n`, MovieStore.movies)
    }

    calcLateFee(id) {
        for (let movie of MovieStore.movies) {
            if (movie.id === id) {
                return `#${movie.rentPrice * MovieStore.lateFee}`
            }
        }
    }

    searchByGenre(genre) {
        //check if user is logged in.
        if (this.isLoggedIn) {
            for (let movie of MovieStore.movies) {
                if (movie.genre === genre) {
                    movie.movieTitle = movie.movieTitle.toUpperCase()
                    movie.genre = movie.genre.toUpperCase()
                    console.log(`${genre.toUpperCase()}:\n`, movie)
                    return
                }
            }
            console.log(`No search result for genre:(${genre.toUpperCase()}) found.`)
        } else {
            console.log(`You must be logged in.`)
        }

    }
    rentMovie(id) {
        //check if user is logged in.
        if (this.isLoggedIn) {

            let rentDetails = {}
            for (let movie of MovieStore.movies) {
                if (movie.id === id) {

                    let now = new Date()
                    rentDetails["movieId"] = movie.id
                    rentDetails["movieTitle"] = movie.movieTitle.toUpperCase()
                    rentDetails["rentPrice"] = `#${movie.rentPrice}`
                    rentDetails['dateborrowed'] = new Date().toDateString()
                    rentDetails["dueDateToReturn"] = new Date(now.setDate(now.getDate() + MovieStore.borrowWindow)).toDateString()
                    rentDetails['feeToPayAfterDueDate'] = this.calcLateFee(movie.id)
                    movie['returnDate'] = rentDetails["dueDateToReturn"]

                    console.log('RENT DETAILS:\n', rentDetails)
                    MovieStore.customers.push(this.username)
                    console.log(`customer(s) who have rented a movie: `, MovieStore.customers)

                    rentDetails = null
                    return
                }

            }

            console.log(`No movie with this id:(${id}).`)
        }
        else {
            console.log(`You must be logged in.`)
        }

    }

    returnMovie() {
        MovieStore.customers = MovieStore.customers.filter((customer, index) => {
            if (this.username !== customer) {
                return true
            }
            return false
        })
        console.log(`cutomer(s) yet to return rented movie: `, MovieStore.customers)
    }

    static uploadMovie({ genre, movieTitle, rentPrice, rating, desc, id }) {
        MovieStore.movies.push({ genre, movieTitle, rentPrice, rating, desc, id })
    }
}


const user = new MovieStore("Confidence", 7031352210)
MovieStore.listMovies()
//You must login to access other methods aside listmovies()
user.login("Confidence", 7031352210)
console.log()
user.searchByGenre('drama')
console.log()
user.rentMovie(4)
console.log()
user.returnMovie()
console.log()
MovieStore.uploadMovie({ genre: "action", desc: "A soilder who's family died when he was on a mission and now all he wants is revenge.", rentPrice: 250, movieTitle: "Rage", rating: 8.6, id: 5555 })
console.log()
MovieStore.listMovies()
console.log()
user.logout()
console.log()