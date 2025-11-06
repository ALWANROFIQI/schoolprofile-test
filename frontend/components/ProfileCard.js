export default function ProfileCard({ profile }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-2">{profile.name}</h2>
      <p>{profile.address}</p>
      <p className="text-sm text-gray-600">{profile.phone} · {profile.email}</p>
      <div className="mt-3">{profile.description}</div>
    </div>
  );
}
