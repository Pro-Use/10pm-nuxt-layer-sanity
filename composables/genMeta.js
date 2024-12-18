export const gen_meta = async() => {
    
    const url = useRequestURL()
    const currentUrl = url.href     // https://example.com:3000/hello-world    
    const protocol = url.protocol   // https:
    const host = url.host           // example.com:3000
    const hostname = url.hostname   // example.com
    const pathname = url.pathname   // /hello-world

    const route = useRoute()

    let description_fallback_key = null
    if (route.params.project){
        description_fallback_key = 'caption'
    }

    const slug = pathname.split('/').pop() 
    const site = 'home-page'
    const title_fallback_key = null
    const rootUrl = protocol + '//' + hostname
    currentUrl

    const meta = []
    const link = []
    let title = ""

    // Get Meta

    const POST_QUERY = groq`*[ slug.current == $slug][-1] { 
        'title': select(
            defined(seo.seo_title) => seo.seo_title,
            defined(@[$title_fb]) => @[$title_fb],
            title
        ),
        'description': select(
            defined(seo.seo_description) => seo.seo_title,
            defined(@[$desc_fb]) => @[$desc_fb],
            *[slug.current == $site][0].seo.seo_description
        )
    }`

    const { data } = await useSanityQuery(POST_QUERY, 
        {slug: slug, title_fb: title_fallback_key, desc_fb: description_fallback_key, site: site, perspective: 'published'},
        // {server:false}
    );

    const page_meta = data.value
    

    if (page_meta){
        console.log('page_meta', page_meta.title)
        // colours and icons

        meta.push({name:"theme-color", content:"#fff", media:"(prefers-color-scheme: light)"})
        meta.push({name:"theme-color", content:"#fff", media:"(prefers-color-scheme: dark)"})
        
        link.push({rel:"apple-touch-icon", sizes:"180x180", href:"/apple-touch-icon.png"})
        link.push({rel:"icon", type:"image/png", sizes:"32x32", href:"/favicon-32x32.png"})
        link.push({rel:"icon", type:"image/png", sizes:"16x16", href:"/favicon-16x16.png"})


        // title
        
        title = page_meta.title.toLowerCase()

        // description
        meta.push({name:"description", content: page_meta.description})
        // Open Graph
        meta.push({property:"og:title", content: title})
        meta.push({property:"og:description", content: page_meta.description})
        meta.push({id:"og:image", content: rootUrl+'/android-chrome-512x512.png'})
        meta.push({property:"og:url", content: currentUrl})
        //Twitter
        meta.push({name:"twitter:card", content: 'summary_large_image'})
        meta.push({name:"twitter:title", content: title})
        meta.push({name:"twitter:description", content: page_meta.description})
        meta.push({name:"twitter:image", content: rootUrl+'/android-chrome-512x512.png'})
    }
    return {meta: meta, link: link, title: title}

}