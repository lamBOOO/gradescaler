import App from '../components/App';

export default function Main({input}) {
  return <App input={input} changeDescription={true} changeOgImage={true}/>
};

export async function getServerSideProps({query}) {
  const { input } = query

  return {
    props: {
      input: JSON.parse(decodeURI( input ))
    },
  };
}
