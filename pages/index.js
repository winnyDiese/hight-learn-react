import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home({posts, date}) {
  // const [posts, setPosts] = useState([])

  // const data = fetch(`http://jsonplaceholder.typicode.com/posts?_limit=4`)
  //   .then(r => r.json())
  //   .then(setPosts)


  const [count, setCount] = useState(0)

  useEffect(()=>{
    const timer = setInterval(() => setCount( n => n + 1), 1000)
    return () => {
      clearInterval(timer)
    }
  },[])


  return (
    <>
      <ul>
        <h4>Count : {count} - {date} </h4>
        <h1>Articles</h1>

        {posts.map(post => <li>
          <Link href={`/blog/${post.id}`}>
            <h3> {post.id} - {post.title} </h3>
          </Link>
        </li>)}
      </ul>
    </>
  )
}




// POUR DES FUCHIERS STATICS
// /////////////////////////

// export async function getStaticProps(){
//   const posts = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=4`)
//   .then(r => r.json())

//   return {
//     props : {
//       posts
//     }
//   }
// }





// POUR DES FUCHIERS DYNAMIQUE
// ///////////////////////////

// getServerSideProps est utilisé en cas ou le site 
// est tout le temps mis a jour


// export async function getServerSideProps(){
//   const posts = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=4`)
//   .then(r => r.json())

//   return {
//     props : {
//       posts,
//       date: (new Date().toString())
//     }
//   }
// }




// POUR DES FUCHIERS SEMI-DYNAMIQUE, SEMI-STATIC
// ///////////////////////////

// GetStaticProps, avec l'option : revalidate
// Permet au site static de ss revalider apres un certain 
// nombre de temps


export async function getStaticProps(){
  const posts = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=4`)
  .then(r => r.json())

  return {
    props : {
      posts,
      date: (new Date().toString())
    },
    revalidate : 5
  }
}

