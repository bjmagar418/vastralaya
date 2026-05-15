import React from 'react'
import category1 from '../../assets/category-1.jpg';
import category2 from '../../assets/category-2.jpg';
import category3 from '../../assets/category-3.jpg';
import category4 from '../../assets/category-4.jpg';
import { Link } from 'react-router'
const Categories = () => {

        const categories =[
        { name:'Men',path:'men',image: category1},
        { name:'Women',path:'women',image: category2},
        { name:'Kids',path:'kids',image: category3},
        { name:'Traditional wear',path:'traditionalWear',image: category4},
        { name:'Former Wear',path:'formerWear',image: category4},
        { name:'Casual Wear',path:'casualWear',image: category4},
        { name:'Accessories',path:'accessories',image: category4},


    ]
  return (
    <div className='flex flex-col pt-3'>
     <h1 className=' Categories_head '>Featured Categories</h1>
     <div  className='product__grid'>
   {
    categories.map((category)=>(
   <Link  key={category.name}to ={`/categories/${category.path}`} className='categories__card'>
    <img src={category.image} alt={category.name}/>
    <h4>{category.name}</h4>
   </Link>
    ))
  }
     </div>
    </div>
  )
}

export default Categories;
