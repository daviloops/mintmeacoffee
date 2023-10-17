import { Metadata } from 'next';
import ProfilePage from '@/components/pages/ProfilePage';
 
export const metadata: Metadata = {
  title: 'Profile page',
}

interface pageParams {
  id: string,
}

export default function Profile({ params }: { params: pageParams }) {
  return <ProfilePage profileId={params.id} />;
}