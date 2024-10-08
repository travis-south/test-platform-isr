// pages/[slug]/mobile.tsx
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';

interface PageProps {
  content: string;
}

async function fetchAllSlugs(): Promise<string[]> {
  return ['slug-1', 'slug-2'];
}

async function fetchContentFromCMS(slug: string, device: 'desktop' | 'mobile'): Promise<string> {
  const randomNum = Math.floor(Math.random() * 100);
  return `Content for ${device} with slug: ${slug} and random number: ${randomNum}`;
}

const MobilePage: NextPage<PageProps> = ({ content }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Mobile Page</h1>
      <div>{content}</div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all possible slugs from your CMS
  const slugs: string[] = await fetchAllSlugs();

  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug = params?.slug as string;

  // Fetch content for mobile from your CMS
  const content = await fetchContentFromCMS(slug, 'mobile');

  return {
    props: {
      content,
    },
    revalidate: 60, // ISR: Revalidate every 60 seconds
  };
};

export default MobilePage;
