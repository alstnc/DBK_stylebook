import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from 'react';
import { Tables } from "@/lib/utils/types";
import { supabase } from '@/lib/utils/supabase/supabaseClient';

interface MainSectionProps {
  searchInput: string;
  initialData: Tables<'stylebook'>[];
}

const MainSection: React.FC<MainSectionProps> = ({ searchInput, initialData }) => {
  const [totalCount, setTotalCount] = useState(0);
  const [data, setData] = useState<Tables<'stylebook'>[]>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const lowercasedSearchInput = searchInput.toLowerCase();

  const highlightText = (text: string) => {
    if (!searchInput) return text;
    const parts = text.split(new RegExp(`(${searchInput})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === lowercasedSearchInput ? (
            <span key={i} className="bg-yellow-300 dark:bg-blue-400">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const filteredData = data.filter(
    (item) =>
      item.term?.toLowerCase().includes(lowercasedSearchInput) ||
      (item.definition && item.definition.toLowerCase().includes(lowercasedSearchInput))
  );

  const groupedByLetter = filteredData.reduce((groups, item) => {
    const letter = item.letter?.toUpperCase() || '';
    if (!groups[letter]) {
      groups[letter] = [];
    }
    groups[letter].push(item);
    return groups;
  }, {} as { [key: string]: Tables<'stylebook'>[] });

  const sortedLetters = Object.keys(groupedByLetter).sort();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data: fetchedData, error } = await supabase
        .from('stylebook')
        .select('*')
        .order('term', { ascending: true });

      if (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } else {
        setData(fetchedData || []);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Fetch total count on component mount
  useEffect(() => {
    const fetchTotalCount = async () => {
      const { count, error } = await supabase
        .from('stylebook')
        .select('*', { count: 'exact', head: true }); // head=true to fetch only count

      if (error) {
        console.error('Error fetching total count:', error);
      } else {
        setTotalCount(count || 0);
      }
    };

    fetchTotalCount();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      {sortedLetters.map((letter, index) => (
        <div key={index} className="mb-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-100">{letter}</h1>
            <Separator className="my-4" />
          </div>
          {groupedByLetter[letter].map((item: Tables<'stylebook'>, itemIndex: number) => (
            <div
              key={itemIndex}
              id={item.term!}
              className="relative block overflow-hidden rounded-lg border border-gray-100 my-6 p-4 sm:p-6 lg:p-8 dark:border-gray-900"
            >
              <span className="absolute inset-x-0 bottom-0 h-2 bg-red-500 dark:bg-red-600"></span>
              <div className="sm:flex sm:justify-between sm:gap-4">
                <div className="w-full flex flex-row justify-between">
                  <div>
                    <div className="w-full flex flex-row justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-gray-100">
                        {highlightText(item.term!)}
                      </h3>
                    </div>

                    {item.important && (
                      <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-500">Important</p>
                    )}
                    {item.sports && (
                      <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-500">Sports</p>
                    )}
                    {item.ap && (
                      <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-500">AP Deviation</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  {highlightText(item.definition!)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MainSection;
