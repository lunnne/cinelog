'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, MapPin, User } from 'lucide-react';
import ReviewHeader from '@/app/movies/[id]/components/ReviewHeader';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

export default function ReviewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [location, setLocation] = useState('');
  const [friend, setFriend] = useState('');
  const [open, setOpen] = useState(false);

  // 나중에 실제 데이터로 교체 (fetch movie inf o)
  const movie = {
    title: '노인을 위한 나라는 없다',
    posterUrl:
      'https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1935',
  };

  const handleSubmit = async () => {
    if (!rating || !comment) return alert('별점과 리뷰를 입력해주세요.');

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId: id, rating, comment, watchedDate: date }),
    });

    if (res.ok) router.push(`/movies/${id}`);
    else alert('리뷰 저장 중 오류가 발생했습니다.');
  };

  return (
    <>
      <ReviewHeader />
      <div className=" bg-linear-to-b from-[#0a0a0f] to-[#0d0d19] text-gray-100 px-6 pt-20 py-10 flex flex-col items-center">
        <div className="max-w-lg w-full flex flex-col items-center gap-6">
          {/* 🎞️ 영화 포스터 */}
          <div className="w-[125px] h-[180px] md:w-[200px] md:h-[300px] md:mt-8 relative rounded-lg overflow-hidden shadow-lg">
            <Image src={movie.posterUrl} alt={movie.title} fill className="object-cover" priority />
          </div>

          {/* 🎬 제목 */}
          <h1 className="text-lg md:text-2xl md:m-4 font-semibold text-white text-center">{movie.title}</h1>

          {/* 📅 날짜 선택 */}

          <div className="flex items-center justify-center gap-3 w-full md:w-[400px]">
            <CalendarIcon className="w-4 h-4 md:w-6 md:h-6 text-gray-400" />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className="w-full text-left bg-transparent border-b border-gray-700 focus:border-violet-400 outline-none text-sm text-gray-300 py-1">
                  {format(date, 'yyyy.MM.dd')}
                </button>
              </PopoverTrigger>
              <PopoverContent
                sideOffset={8}
                className="p-2 bg-[#12121f] border border-violet-400/20 rounded-xl shadow-lg animate-in fade-in-0 zoom-in-95"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  defaultMonth={date}
                  onSelect={(d) => {
                    if (d) {
                      setDate(d);
                      setOpen(false);
                    }
                  }}
                  modifiersClassNames={{
                    today: 'ring-1 ring-violet-400 rounded-full text-violet-300',
                    selected: 'bg-violet-500/50 text-white rounded-full ring-0',
                  }}
                  classNames={{
                    day: 'h-9 w-9 grid place-items-center rounded-full hover:bg-violet-500 transition-colors',
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          {/*🌍 위치 선택*/}
          <div className="flex items-center justify-center gap-3 text-gray-400 w-full md:w-[400px]">
            <MapPin className="w-4 h-4 md:w-6 md:h-6" />
            <input
              type="text"
              placeholder="어디서 봤어요?"
              onChange={(e) => setLocation(e.target.value)}
              className=" w-full bg-transparent border-b border-gray-700 focus:border-violet-400 outline-none text-sm text-gray-300"
            />
          </div>
          {/* 친구 선택  */}
          <div className="flex items-center justify-center gap-3 text-gray-400 w-full md:w-[400px]">
            <User className="w-4 h-4 md:w-6 md:h-6" />
            <input
              type="text"
              placeholder="누구랑 봤어요?"
              onChange={(e) => setFriend(e.target.value)}
              className="w-full bg-transparent border-b border-gray-700 focus:border-violet-400 outline-none text-sm text-gray-300"
            />
          </div>

          {/* ⭐ 별점 선택 */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                onClick={() => setRating(i + 1)}
                className={`md:w-8 md:h-8 w-6 h-6 cursor-pointer transition ${
                  i < rating ? 'text-violet-400 fill-violet-400' : 'text-gray-600 hover:text-violet-300'
                }`}
              />
            ))}
          </div>

          {/* 💭 리뷰 작성 */}
          <textarea
            placeholder="생각난 한마디를 남겨보세요."
            className="w-full h-35 md:h-45 text-sm md:text-base bg-white/5 border border-violet-400/20 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-violet-400/50 resize-none backdrop-blur-md"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {/* 💾 저장 버튼 */}
          <button className="cinelog-btn max-w-lg text-sm md:text-base" onClick={handleSubmit}>
            저장하기
          </button>
        </div>
      </div>
    </>
  );
}
