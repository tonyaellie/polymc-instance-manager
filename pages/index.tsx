import Layout from '../components/Layout';
import useSWR from 'swr';
import InstanceList from '../components/InstanceList';
import Upload from '../components/Upload';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const IndexPage = () => {
  const { data, error } = useSWR('/api/instances', fetcher, {
    refreshInterval: 1000
  });

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      <h1>Instances:</h1>
      <InstanceList instancesNames={data} />
      {/* <Upload /> */}
    </Layout>
  );
};

export default IndexPage;
