import BookDetailsModal from "./Partials/BookDetailsModal.js";

export default ({
    data: () => ({
        searchResult: {}
    }),
    methods: {
        search() {
            fetch('/api/search', {
                method: 'POST',
                body: JSON.stringify({ 'search': this.$route.query.search_value }),
                headers: {
                    'Authentication-Token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json()).then((data) => {
                this.searchResult = data
            })
        },
        showBookDetail(book) {

            this.$refs.bookModal.viewModal(book)
        }
    },
    watch: {
        '$route.params': { // Triggers the watcher immediately when the component is created
            handler(newParams, oldParams) {
                this.search()
            }
        }
    },
    created() {
        this.search()
    },
    components: { BookDetailsModal },

    template: `
        <div class="search pt-2 pb-5">
            <h4>Result in Books :</h4>
             <table class="table table-bordered">
                <thead>
                <tr>
                
                    <th>Book Title</th>
                    <th>Book Author</th>
                    <th>Action</th>
                </tr>    
                </thead> 
                <tbody>
                    <tr v-for="(book,i) in searchResult.books">
                        <td>{{book.title}}</td>
                        <td>{{book.author}}</td>
                        <td >
                        <button class="btn btn-primary" @click="showBookDetail(book)">View Book</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h4>Result in Section :</h4>
            <table class="table table-bordered">
                <thead>
                <tr>
                
                    <th>Section Name</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>    
                </thead> 
                <tbody>
                    <tr v-for="(section,i) in searchResult.sections">
                        <td>{{section.section_name}}</td>
                        <td>{{section.section_description}}</td>
                        <td >
                        <button class="btn btn-primary " >
                        <router-link class="text-white" :to="'/section/'+section.section_id">
                            View Section
                        </router-link>
                        </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <BookDetailsModal ref="bookModal"/>
            
        </div>
    `,


})


















// import BookDetailsModal from "./Partials/BookDetailsModal.js";

// export default ({
//     data: () => ({
//         searchResult: {},
//         minRating: 0
//     }),
//     methods: {
//         search() {
//             fetch('/api/search', {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     'search': this.$route.query.search_value,
//                     'min_rating': this.minRating
//                 }),
//                 headers: {
//                     'Authentication-Token': localStorage.getItem('auth-token'),
//                     'Content-Type': 'application/json'
//                 }
//             }).then((res) => res.json()).then((data) => {
//                 this.searchResult = data;
//             });
//         },
//         showBookDetail(book) {
//             this.$refs.bookModal.viewModal(book);
//         }
//     },
//     watch: {
//         '$route.params': { // Triggers the watcher immediately when the component is created
//             handler(newParams, oldParams) {
//                 this.search();
//             }
//         }
//     },
//     created() {
//         this.search();
//     },
//     components: { BookDetailsModal },

//     template: `
//         <div class="search pt-2 pb-5">
//             <h4>Result in Books :</h4>
//             <label for="min-rating">Minimum Rating:</label>
//             <select v-model="minRating" id="min-rating" @change="search">
//                 <option v-for="n in 5" :key="n" :value="n">{{n}}</option>
//             </select>
//             <table class="table table-bordered">
//                 <thead>
//                 <tr>
//                     <th>Book Title</th>
//                     <th>Book Author</th>
//                     <th>Rating</th>
//                     <th>Action</th>
//                 </tr>    
//                 </thead> 
//                 <tbody>
//                     <tr v-for="(book,i) in searchResult.books" :key="i">
//                         <td>{{book.title}}</td>
//                         <td>{{book.author}}</td>
//                         <td>{{book.average_rating.toFixed(2)}}</td>
//                         <td>
//                             <button class="btn btn-primary" @click="showBookDetail(book)">View Book</button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//             <h4>Result in Section :</h4>
//             <table class="table table-bordered">
//                 <thead>
//                 <tr>
//                     <th>Section Name</th>
//                     <th>Description</th>
//                     <th>Action</th>
//                 </tr>    
//                 </thead> 
//                 <tbody>
//                     <tr v-for="(section,i) in searchResult.sections" :key="i">
//                         <td>{{section.section_name}}</td>
//                         <td>{{section.section_description}}</td>
//                         <td>
//                             <button class="btn btn-primary">
//                                 <router-link class="text-white" :to="'/section/'+section.section_id">
//                                     View Section
//                                 </router-link>
//                             </button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//             <BookDetailsModal ref="bookModal"/>
//         </div>
//     `
// });



// import BookDetailsModal from "./Partials/BookDetailsModal.js";

// export default ({
//     data: () => ({
//         searchResult: {
//             books: [],
//             sections: []
//         },
//         minRating: 0
//     }),
//     methods: {
//         search() {
//             fetch('/api/search', {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     'search': this.$route.query.search_value,
//                     'min_rating': this.minRating
//                 }),
//                 headers: {
//                     'Authentication-Token': localStorage.getItem('auth-token'),
//                     'Content-Type': 'application/json'
//                 }
//             })
//                 .then((res) => res.json())
//                 .then((data) => {
//                     if (data.books && data.sections) {
//                         this.searchResult = data;
//                     } else {
//                         console.error('Unexpected response structure:', data);
//                     }
//                 })
//                 .catch((error) => {
//                     console.error('Error during search request:', error);
//                 });
//         },
//         showBookDetail(book) {
//             this.$refs.bookModal.viewModal(book);
//         }
//     },
//     watch: {
//         '$route.params': {
//             handler(newParams, oldParams) {
//                 this.search();
//             },
//             immediate: true  // Triggers the watcher immediately when the component is created
//         }
//     },
//     created() {
//         this.search();
//     },
//     components: { BookDetailsModal },

//     template: `
//         <div class="search pt-2 pb-5">
//             <h4>Result in Books :</h4>
//             <label for="min-rating">Minimum Rating:</label>
//             <select v-model="minRating" id="min-rating" @change="search">
//                 <option v-for="n in 5" :key="n" :value="n">{{n}}</option>
//             </select>
//             <table class="table table-bordered">
//                 <thead>
//                 <tr>
//                     <th>Book Title</th>
//                     <th>Book Author</th>
//                     <th>Rating</th>
//                     <th>Action</th>
//                 </tr>    
//                 </thead> 
//                 <tbody>
//                     <tr v-for="(book,i) in searchResult.books" :key="i">
//                         <td>{{book.title}}</td>
//                         <td>{{book.author}}</td>
//                         <td>{{book.average_rating.toFixed(2)}}</td>
//                         <td>
//                             <button class="btn btn-primary" @click="showBookDetail(book)">View Book</button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//             <h4>Result in Section :</h4>
//             <table class="table table-bordered">
//                 <thead>
//                 <tr>
//                     <th>Section Name</th>
//                     <th>Description</th>
//                     <th>Action</th>
//                 </tr>    
//                 </thead> 
//                 <tbody>
//                     <tr v-for="(section,i) in searchResult.sections" :key="i">
//                         <td>{{section.section_name}}</td>
//                         <td>{{section.section_description}}</td>
//                         <td>
//                             <router-link class="text-white" :to="'/section/'+section.section_id">
//                                 <button class="btn btn-primary">View Section</button>
//                             </router-link>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//             <BookDetailsModal ref="bookModal"/>
//         </div>
//     `
// });



