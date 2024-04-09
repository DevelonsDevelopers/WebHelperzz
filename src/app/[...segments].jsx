// pages/[...segments].jsx

import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { segments } = router.query;

  if (!segments || segments.length < 4) {
    return <div>{`Page doesn't exist`}</div>;
  }

  const [state, city, category] = segments;

  return (
    <div>
      {`/category/${state}/${city}/${category}`} {`Page doesn't exist`}
    </div>
  );
};

export default Page;
