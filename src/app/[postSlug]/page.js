import React from 'react';
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";
import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";
import styles from "./postSlug.module.css";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
import CircularColorsDemo from "@/components/CircularColorsDemo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const blogPostData = await loadBlogPost(params.postSlug);
  if (!blogPostData) {
    return null;
  }

  const { frontmatter } = blogPostData;
  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const blogPostData = await loadBlogPost(params.postSlug);
  if (!blogPostData) {
    notFound();
  }

  const { frontmatter, content } = blogPostData;
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
