const category = document.getElementById('category')
const main = document.getElementById('main')


const loadCategory = ()=>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url).then(res=> res.json())
    .then(res=>{
        res.data.news_category.map((item,i)=> {
            const a = document.createElement('a')
            a.innerText = `${item.category_name}`
            a.setAttribute("href","#")
            a.setAttribute("onclick",`getNewsByCategory(${ JSON.stringify(item.category_id)})`)
            a.classList.add('nav-link')
            if(i==0){a.classList.add('active')}
            category.append(a)
            return console.log(item , i)
        })

     })
    .catch(err => console.log(err))
}

const getNewsByCategory =(category_id='01')=>{
    main.innerHTML = ""
   const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    
    fetch(url).then(res=>res.json()).then(res=>{ 
        res.data.map((news)=>{ 
            const div = document.createElement('div')
            div.classList.add('card','mt-3')
            div.innerHTML = ` <div class="row">
                                <div class="col-12 col-md-4"> <img class=" img-fluid rounded" src="${news.image_url}" alt=""> </div>
                                    <div class="col-12 col-md-8 card-body pt-0 ">
                                        <h5 class="card-header">${news.category_id}</h5>
                                        <h5 class="card-title">Special title treatment</h5>
                                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                    </div>
                                </div>
                            `
            
            main.append(div)
            return console.log(news)})
        if(res.data.length == 0 ) { 
            main.innerHTML= ` <h4 class="text-danger text-center"> No News Found  </h4>`
        }
        return console.log(res) } )
    
}

loadCategory()
getNewsByCategory()



