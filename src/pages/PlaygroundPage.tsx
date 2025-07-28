import OrderStatusSelector from '../components/OrderStatusSelector';

const PlaygroundPage = () => {
  // return <Onboarding />;
  return <OrderStatusSelector onChange={(text) => console.log(text)} />;
};

export default PlaygroundPage;
