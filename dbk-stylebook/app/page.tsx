"use client";
import { useState } from 'react';
import Header from "@/components/header"
import MainSection from "@/components/main-section"
import MobileSidebar from "@/components/mobile-sidebar"
import Sidebar from "@/components/sidebar"
import { supabase } from '@/lib/utils/supabase/supabaseClient';
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { Tables } from "@/lib/utils/types";

export default function Home() {
  const [searchInput, setSearchInput] = useState('');

  const { data: stylebookData, error } = useQuery<Tables<'stylebook'>[]>(
    supabase.from('stylebook').select('*'),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const loading = !stylebookData && !error;

  return (
    <div className="h-screen flex flex-col dark:bg-zinc-900">
      {loading ? (
        <div></div>
      ) : (
        <MobileSidebar initialData={stylebookData || []} />
      )}
      <header>
        <Header setSearchInput={setSearchInput} />
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden overflow-auto md:flex md:w-72 md:flex-col">
          {loading ? (
            <div></div>
          ) : (
            <Sidebar initialData={stylebookData || []} />
          )}
        </div>

        <main className="flex-1 overflow-auto p-8">
          {loading ? (
            <div></div>
          ) : (
            <MainSection searchInput={searchInput} initialData={stylebookData || []} />
          )}
        </main>
      </div>
    </div>
  );
}
