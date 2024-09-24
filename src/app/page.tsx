import { defineQuery } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

const options = { next: { revalidate: 0 } };

const QUERY = defineQuery(`*[_type =='blogs']`);

export default async function IndexPage() {
  const blogs = await client.fetch(QUERY, {}, options);
  console.log(blogs);

  return (
    <main className="p-10">
      <header className="title text-green-800 bg-zinc-400">
        {" "}
        Famous Pakistani Cities
      </header>
      <div className="flex gap-5 ">
        {blogs.map((blog: Blog) => (
          <div key={blog._id} className="border rounded-md shadow-lg p-5">
            <h1 className="font-serif text-2xl">{blog.title}</h1>
            <Image
              src={urlFor(blog.image.asset).url()}
              alt={blog.title}
              width={300}
              height={150}
              className="
            pt-4 pb-5
     "
            />
            <p>{blog.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

// import { client } from "@/sanity/lib/client";
// import { groq } from "next-sanity";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";
// import { createClient } from "next-sanity";

// const cache = { next: { revalidatePath: 30 } };
// interface Blog {
//   _id: string;
//   title: string;
//   description: string;
//   image: {
//     asset: {
//       _ref: string;
//       _type: string;
//     };
//   };
// }

// const getBlogs = async () => {
//   return client.fetch(groq`*[_type =='blogs']`, {}, cache);
// };
// export default async function Home() {
//   const blogs = await getBlogs();
//   console.log("🚀 ~ Home ~ blogs:", blogs);

//   return (
//     <main className="p-10">
//       <header className="title text-green-800 bg-zinc-400">
//         {" "}
//         Famous Pakistani Cities
//       </header>
//       <div className="flex gap-5 ">
//         {blogs.map((blog: Blog) => (
//           <div key={blog._id} className="border rounded-md shadow-lg p-5">
//             <h1 className="font-serif text-2xl">{blog.title}</h1>
//             <Image
//               src={urlFor(blog.image.asset).url()}
//               alt={blog.title}
//               width={300}
//               height={150}
//               className="
//               pt-4 pb-5
//        "
//             />
//             <p>{blog.description}</p>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }
