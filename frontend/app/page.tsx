import FrontOfficeLayout from './(front-office)/layout';
import HomePage from './(front-office)/page';

export default function RootPage() {
  return (
    <FrontOfficeLayout>
      <HomePage />
    </FrontOfficeLayout>
  );
}