'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Profile() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<{ success: boolean }>(
        '/api/users/logout',
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.success) {
        router.push('/login');
      } else {
        setError('Logout failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container:
      'flex flex-col justify-center items-center min-h-screen bg-white text-primary gap-4',
    button:
      'bg-primary px-4 py-2 rounded-md hover:bg-dark transition-all duration-300 text-white',
    errorMessage: 'text-red-500',
  };

  return (
    <div className={styles.container}>
      <h1>Profile Page</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <button
        className={styles.button}
        onClick={handleLogout}
        disabled={loading}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
}
