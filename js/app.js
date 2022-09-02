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
                                    <a href="#" class="btn btn-primary mr-auto">Go somewhere</a>
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

loadCategory()
getNewsByCategory()



