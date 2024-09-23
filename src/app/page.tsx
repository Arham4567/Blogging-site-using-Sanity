import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
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

const getBlogs = async () => {
  return client.fetch(`*[_type =='blogs']`);
};
export default async function Home() {
  const blogs = await getBlogs();
  console.log("🚀 ~ Home ~ blogs:", blogs);

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

// // import { urlFor } from "@/sanity/lib/image";
// const getBlogs = async () => {
//   return client.fetch(`*[_type =='blogs']`);
// };
// export default async function Home() {
//   const blogs = await getBlogs();
//   console.log(blogs);
//   return (
//     <>
//       <div className="title text-green-800 bg-zinc-400">
//         Famous Pakistani Cities
//       </div>
//       <div>
//         {blogs.map((blog: Blog) => {
//           <div key={blog._id} className="border rounded-md shadow-lg p-5">
//             <h1>{blog.title}</h1>
//             <p>{blog.description}</p>
//           </div>;
//         })}
//       </div>
//     </>
//   );
// }
