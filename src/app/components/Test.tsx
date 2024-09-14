async function getArticles(){
    const res = await fetch('http://localhost:8000/articles', {
        next: {
            revalidate: 0
        }
    })

    return res.json();
}

export default async function ArticleList(){
    const articles = await getArticles();

    return (
        <>
            {
                articles.data.map((article: any) => (
                    <div>{article.Name}</div>
                ))
            }
        </>
    )
}