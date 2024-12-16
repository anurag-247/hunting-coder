import React, { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component';

const Blog = (props) => {
    const [blogs, setBlogs] = useState(props.allBlogs);
    const [count, setCount] = useState(2)


    const fetchData = async () => {
        let d = await fetch('http://localhost:3000/api/blogs/?count=${count=2}')
        setCount(count + 2)
        let data = await d.json()
        setBlogs(data)
    };

    return (
        <main className={styles.main}>

            <InfiniteScroll
                dataLength={blogs.length} //This is important field to render the next data
                next={fetchData}
                hasMore={props.allCount !== blogs.length}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >

                <div className={styles.blogs}>
                    <div className="blogItem">
                        <h2>Popular Blogs</h2>
                        <br />
                    </div>
                    {blogs.map((blogItem) => {
                        return <div key={blogItem.slug}>
                            <Link href={`/blogpost/${blogItem.slug}`}>
                                <h3>{blogItem.title}</h3></Link>
                            <p>{blogItem.metadesc.substr(0, 100)}</p>
                            <br></br>
                        </div>
                    })}
                </div>
            </InfiniteScroll>

        </main>
    )
};



export async function getStaticProps(context) {
    let data = await fs.promises.readdir("blogdata");
    let allCount = data.length
    let myfile;
    let allBlogs = [];
    for (let index = 0; index < data.length; index++) {
        const item = data[index];
        myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
        allBlogs.push(JSON.parse(myfile))
    }
    return {
        props: { allBlogs, allCount } // will be passed to the page component as props
    }
}

export default Blog