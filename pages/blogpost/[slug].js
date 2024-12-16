import React, { useState } from 'react'
import * as fs from 'fs';


const slug = (props) => {
function createMarkup(c) {
  return {__html: c};
}


  const [blog, setBlog] = useState(props.myBlog);


  return (
    <div>
      <h1>{blog && blog.title}</h1>
      <hr />
      {blog &&<div dangerouslySetInnerHTML={createMarkup(blog.content)}></div> }
      
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug:'learn-flask' } },
      { params: { slug:'learn-javascript' } },
      { params: { slug:'learn-next' } }
  ],
    fallback: true, // can also be true or 'blocking'
  };
}


export async function getStaticProps(context) {
  const { slug } = context.params;
  
let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`,'utf8')

  return {
    props: { myBlog: JSON.parse(myBlog) } // will be passed to the page component as props
  }
}

export default slug;