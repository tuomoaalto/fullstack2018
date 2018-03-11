const blogs = [
    {
        '_id': '5a422a851b54a676234d17f7',
        'title': 'React patterns',
        'author': 'Michael Chan',
        'url': 'https://reactpatterns.com/',
        'likes': 14,
        'user': {
            '_id': '5a92f991b4d4bf0b0cd2519c',
            'username': 'Alfa',
            'name': 'A. Lfa',
            'adult': true,
        }
    },
    {
        '_id': '5a422aa71b54a676234d17f8',
        'title': 'Go To Statement Considered Harmful',
        'author': 'Edsger W. Dijkstra',
        'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        'likes': 7,
        'user': {
            '_id': '5a92f991b4d4bf0b0cd2519c',
            'username': 'Alfa',
            'name': 'A. Lfa',
            'adult': true,
        }
    },
    {
        '_id': '5a422b3a1b54a676234d17f9',
        'title': 'Canonical string reduction',
        'author': 'Edsger W. Dijkstra',
        'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        'likes': 13,
        'user': {
            '_id': '5a92f99eb4d4bf0b0cd2519d',
            'username': 'Beta',
            'name': 'B. Eta',
            'adult': true
        }
    },
    {
        '_id': '5a422b891b54a676234d17fa',
        'title': 'First class tests',
        'author': 'Robert C. Martin',
        'url': 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        'likes': 12,
        'user': {
            '_id': '5a92f99eb4d4bf0b0cd2519d',
            'username': 'Beta',
            'name': 'B. Eta',
            'adult': true
        }
    },
    {
        '_id': '5a422ba71b54a676234d17fb',
        'title': 'TDD harms architecture',
        'author': 'Robert C. Martin',
        'url': 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        'likes': 1,
        'user': {
            '_id': '5a92f9a2b4d4bf0b0cd2519e',
            'username': 'Gamma',
            'name': 'G. Amma',
            'adult': false
        }
    },
    {
        '_id': '5a422bc61b54a676234d17fc',
        'title': 'Type wars',
        'author': 'Robert C. Martin',
        'url': 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        'likes': 3,
        'user': {
            '_id': '5a92f9a2b4d4bf0b0cd2519e',
            'username': 'Gamma',
            'name': 'G. Amma',
            'adult': false
        }
    },
    {
        '_id': '5a92fefadd1bbb0d782b3493',
        'title': 'Mikki merihädässä',
        'author': 'W. Disney',
        'url': 'http://www.disney.com',
        'likes': 2,
        'user': {
            '_id': '5a92f991b4d4bf0b0cd2519c',
            'username': 'Alfa',
            'name': 'A. Lfa',
            'adult': true,
        }
    }
]

/* eslint-disable no-unused-vars */
let token
/* eslint-enable no-unused-vars */
const setToken = (newToken) => {
    token = newToken
}


const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, setToken, blogs }