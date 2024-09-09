import Book from './Partials/Book.js';
import BookDetailsModal from "./Partials/BookDetailsModal.js";

export default ({
    data: () => ({
        showModal: false,
        bookList: [],
        sections:[]
    }),
    methods: {
        getAllBooks() {
            fetch('/api/book', {
                method: 'GET',
                headers: {
                    'Authentication-Token': localStorage.getItem('auth-token')
                }
            }).then(res => res.json()).then((data) => {
                this.bookList = data;
            })
        },
        showBookDetail(book) {
            this.$refs.bookModal.viewModal(book)
        }
    },
    created() {
        this.getAllBooks()
    },
    template: `
    <div class="px-3 mt-3 pb-5">
        
        
        <h3 class="mb-0 mt-4">All Latest Books</h3>
       <div class="row  justify-content-left">
        <div class="col-lg-2 mt-3  " style="border-collapse: collapse;"  v-for="(book,i) in bookList" :key="i">
            <Book 
                @showDetail="showBookDetail"
                :key="i" 
                :book="book"
            />            
        </div>   
        
        <BookDetailsModal ref="bookModal"/>
    </div>
    </div>
    `,
    components: {Book, BookDetailsModal}
})



// import Book from './Partials/Book.js';
// import BookDetailsModal from "./Partials/BookDetailsModal.js";

// export default ({
//     data: () => ({
//         showModal: false,
//         bookList: [],
//         sections:[]
//     }),
//     methods: {
//         getAllBooks() {
//             fetch('/api/book', {
//                 method: 'GET',
//                 headers: {
//                     'Authentication-Token': localStorage.getItem('auth-token')
//                 }
//             }).then(res => res.json()).then((data) => {
//                 this.bookList = data
//             })
//         },
//         showBookDetail(book) {
//             this.$refs.bookModal.viewModal(book)
//         }
//     },
//     created() {
//         this.getAllBooks()
//     },
//     template: `
//     <div class="px-3 mt-3 pb-5">
//         <h3>Home</h3>
        

//         <h3 class="mb-0 mt-4">All Latest Books</h3>
//        <div class="row  justify-content-left">
//         <div class="col-lg-2 mt-3  " style="border-collapse: collapse;"  v-for="(book,i) in bookList" :key="i">
//             <Book 
//                 @showDetail="showBookDetail"
//                 :key="i" 
//                 :book="book"
//             />            
//         </div>   
        
//         <BookDetailsModal ref="bookModal"/>
//     </div>
//     </div>
//     `,
//     components: {Book, BookDetailsModal}
// })