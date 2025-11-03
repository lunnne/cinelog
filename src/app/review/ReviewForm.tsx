'use client';

import { Popover } from '@/components/ui/popover';
import { CalendarIcon, MapPin, User, Star } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { format } from 'date-fns';
import { useState } from 'react';

interface ReviewFormProps {
  movie: {
    id: number;
    title: string;
    posterUrl: string;
  };
}

export default function ReviewForm({ movie }: ReviewFormProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [friend, setFriend] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

//   const handleSubmit = async () => {
//     if (!rating || !comment) return alert('별점과 리뷰를 입력해주세요.');

//     const res = await fetch('/api/reviews', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ movieId: id, rating, comment, watchedDate: date }),
//     });

//     if (res.ok) router.push(`/movies/${id}`);
//     else alert('리뷰 저장 중 오류가 발생했습니다.');
//   };
  return (
    <>
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
              defaultMonth={date}
              onSelect={(d: Date | undefined) => {
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
      <button className="cinelog-btn max-w-lg text-sm md:text-base">
        저장하기
      </button>
    </>
  );
}
