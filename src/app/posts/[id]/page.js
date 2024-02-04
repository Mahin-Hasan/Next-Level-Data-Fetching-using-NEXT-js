import Link from "next/link";
// Static way
// export async function generateStaticParams() {
//     return [{ id: "1" }, { id: "2" }]
// }
//ddynamic way
export async function generateStaticParams() {
    const res = await fetch(`http://localhost:5000/posts`)
    const posts = await res.json();
    const ids = posts.map((post) => {
        return {
            id: post.id + '',
        };
    });
    // console.log(ids);

    return ids;
}

const DetailPage = async ({ params }) => {
    // console.log(params);
    const res = await fetch(`http://localhost:5000/posts/${params.id}`)
    const post = await res.json();
    console.log(post);
    return (
        <div>
            <h1>Post detail page</h1>
            <div key={post.id} className="card w-3/4 my-5 mx-auto bg-teal-50 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{post.title}</h2>
                    <p>{post.description}</p>
                    <p>Likes: {post.likes_count}</p>
                    <div className="card-actions justify-end">
                        <Link href={`/posts`}>
                            <button className="btn btn-accent">Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;