let baseWorks = [ 
    
    { 
        "id": 1, 
        "title": "Abajour Tahina", 
        "imageUrl": "./assets/images/abajour-tahina.png",
        "categoryId": 1, 
        "userId": 1, 
        "category": { 
            "id": 1, 
            "name": "Objets" 
        } 
    }, 
    { 
        "id": 2, 
        "title": "Appartement Paris V", 
        "imageUrl": "./assets/images/appartement-paris-v.png", 
        "categoryId": 2, 
        "userId": 1, 
        "category": { 
            "id": 2, 
            "name": "Appartements" 
        } 
    }, 
    { 
        "id": 3, 
        "title": "Restaurant Sushisen - Londres", 
        "imageUrl": "./assets/images/restaurant-sushisen-londres.png", 
        "categoryId": 3, 
        "userId": 1, 
        "category": { 
            "id": 3, 
            "name": "Hotels & restaurants" 
        } 
    }, 
    { 
        "id": 4, 
        "title": "Villa “La Balisiere” - Port Louis", 
        "imageUrl": "./assets/images/la-balisiere.png", 
        "categoryId": 2, 
        "userId": 1, 
        "category": { 
            "id": 2, 
            "name": "Appartements" 
        } 
    }, 
    { 
        "id": 5, 
        "title": "Structures Thermopolis", 
        "imageUrl": "./assets/images/structures-thermopolis.png", 
        "categoryId": 1, 
        "userId": 1, 
        "category": { 
            "id": 1, 
            "name": "Objets" 
        } 
    }, 
    { 
        "id": 6, 
        "title": "Appartement Paris X", 
        "imageUrl": "./assets/images/appartement-paris-x.png", 
        "categoryId": 2, 
        "userId": 1, 
        "category": { 
            "id": 2, 
            "name": "Appartements" 
        } 
    }, 
    { 
        "id": 7, 
        "title": "Pavillon “Le coteau” - Cassis", 
        "imageUrl": "./assets/images/le-coteau-cassis.png", 
        "categoryId": 2, 
        "userId": 1, 
        "category": { 
            "id": 2, 
            "name": "Appartements" 
        } 
    }, 
    { 
        "id": 8, 
        "title": "Villa Ferneze - Isola d’Elba", 
        "imageUrl": "./assets/images/villa-ferneze.png", 
        "categoryId": 2, 
        "userId": 1, 
        "category": { 
            "id": 2, 
            "name": "Appartements" 
        } 
    }, 
    { 
        "id": 9, 
        "title": "Appartement Paris XVIII", 
        "imageUrl": "./assets/images/appartement-paris-xviii.png", 
        "categoryId": 2, 
        "userId": 1, 
        "category": { 
            "id": 2, 
            "name": "Appartements" 
        } 
    }, 
    { 
        "id": 10, 
        "title": "Bar “Lullaby” - Paris", 
        "imageUrl": "./assets/images/bar-lullaby-paris.png", 
        "categoryId": 3, 
        "userId": 1, 
        "category": { 
            "id": 3, 
            "name": "Hotels & restaurants" 
        } 
    }, 
    { 
        "id": 11, 
        "title": "Hotel First Arte - New Delhi", 
        "imageUrl": "./assets/images/hotel-first-arte-new-delhi.png", 
        "categoryId": 3, 
        "userId": 1, 
        "category": { 
            "id": 3, 
            "name": "Hotels & restaurants" 
        } 
    }
];

async function myFetch(url, payload = {}) {
    const method = payload.method ? payload.method.toLowerCase() : 'get';

    if (method === 'get') {
        return {
            json() {
                return baseWorks;
            }
        };
    } else if (method === 'post') {
        if (url.includes('login')) {
            const formData = payload.body;
            const email = formData.get('email');
            const password = formData.get('password');

            if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
                return {
                    json() {
                        return { token: '1324' };
                    }
                };
            } else {
                return Promise.reject(new Error('Invalid credentials'));
            };
        } else if (url.includes('works')) {
            // Ajoute le nouveau projet à baseWorks
            const newProject = { ...payload.body, id: baseWorks.length + 1 };
            baseWorks.push(newProject);
            return {
                json() {
                    return newProject;
                }
            };
        }
    } else if (method === 'delete') {
        const lastSlashIndex = url.lastIndexOf('/');
        const id = url.substring(lastSlashIndex + 1);
        baseWorks = baseWorks.filter(element => element.id !== Number(id));
        return {
            json() {
                return { message: 'Deleted' };
            }
        };
    }
}
