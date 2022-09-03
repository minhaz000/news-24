const category = document.getElementById('category')
const main = document.getElementById('main')
const loder =  document.getElementById('loder')

const loadCategory = ()=>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url).then(res=> res.json())
    .then(res=>{
        res.data.news_category.map((item,i)=> {
            const a = document.createElement('a')
            a.innerText = `${item.category_name}`
            a.setAttribute("href","#")
            a.setAttribute("onclick",`getNewsByCategory(${ JSON.stringify(item.category_id)});getActive(this)`)
            a.classList.add('nav-link')
            if(i==0){a.classList.add('active')}
            category.append(a)
            return console.log(item , i)
        })

     })
    .catch(err => console.log(err))
}
const getActive = (elemet)=>{
    const active =  category.querySelector('.active')
    active.classList.remove('active')
    elemet.classList.add('active')
    console.log(elemet)
}
const getNewsByCategory =(id="01")=>{
main.innerHTML = ""
loder.classList.remove('d-none')


   const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    console.log(id,  "this is ")
    fetch(url).then(res=>res.json()).then(res=>{ 
        res.data.map((news)=>{ 
         
            const div = document.createElement('div')
            div.classList.add('card','mt-3','text-center','text-md-start')
            div.innerHTML = ` <div class="row">
                                <div class="col-12 col-md-4"> <img class=" img-fluid rounded" src="${news.image_url}" alt=""> </div>
                                    <div class="col-12 col-md-8 card-body pt-0 ">
                                       
                                        <h5 class="card-title p-2">${news.title}</h5>
                                        <p class="card-text"> ${news.details.slice(0,200)+`  ...`}</p>

                                        <div class=" mt-5" > 
                                        <img class=" img-fluid rounded-circle" src="${news.author.img} height="30px" width="30px"/>
                                        <span class=" px-2"> ${news.author.name ?news.author.name:" No Name found"} </span>
                                        <i class="fa-solid fa-eye   ms-5 "></i>
                                        <span class=" "> ${news.total_view ?news.total_view +"M":" No view found"} </span>
                                        <i class="fa-solid fa-star ms-5"></i>
                                        <span class=" d-none d-md-inline-block"> ${news.rating ?news.rating.number+" " +news.rating.badge :" No rating found"} </span>
                                        
                                    <a onclick='getDetailsNews(${JSON.stringify(news._id)})' class="btn btn-primary float-end mx-3 " data-bs-toggle="modal" data-bs-target="#detailsModal">Veiw Detalis</a>
                                    </div>
                                    </div>
                                </div>
                            `
            
            main.append(div)
            return console.log(news)})
        if(res.data.length == 0 ) { 
            main.innerHTML= ` <h4 class="text-danger text-center"> No News Found  </h4>`
        }
    loder.classList.add('d-none')   
    } )
    
}

const getDetailsNews = (id)=>{
    const url = ` https://openapi.programming-hero.com/api/news/${id}`
    fetch(url).then(res=>res.json()).then((res)=>{
        const modalTitle = document.getElementById('ModalLabel')
        const modalBody = document.getElementById('modal-body')
        const modelFooter = document.getElementById('modal-footer')
        modalTitle.innerText = res.data[0].title
        modalBody.innerHTML = ` 
                                <div class=" text-center  text-break"> <img class=" img-fluid "  src="${res.data[0].image_url}">  </div>
                                <div class=" text-center  text-break mt-5 text-justify"> ${res.data[0].details} </div>
                              `
       modelFooter.innerHTML= ` <div class="ml-auto" > 
       <span class=" px-3"> Todays Pick :${res.data[0].others_info.is_todays_pick ==true?" YES" : "NO"} </span>
       <span class=" px-3"> Trending :${res.data[0].others_info.is_trending==true ? "YES" :"NO"} </span>
       <span class=" px-3"> ${res.data[0].author.name} </span>
       <img class=" img-fluid rounded-circle" src="${res.data[0].author.img} height="30px" width="30px"/> 
        </div>
       `
        

    
    return console.log(res.data[0])
    })
.catch(err=> console.log(err))
}

loadCategory()
getNewsByCategory()



