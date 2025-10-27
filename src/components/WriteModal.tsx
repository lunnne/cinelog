'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { emotions } from '@/lib/emotions';
import { Input } from '@/components/ui/input';

export default function WriteModal() {
  const [title, setTitle] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [emotion, setEmotion] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('moon'); // 임시

  const handleSubmit = async () => {
    if (!emotion || !rating || !title || !comment) return;

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        posterUrl: posterUrl || null,
        emotion,
        rating,
        comment,
        username,
      }),
    });

    if (!res.ok) {
      console.error(await res.json());
      return;
    }

    // 초기화
    setTitle('');
    setPosterUrl('');
    setEmotion(null);
    setRating(0);
    setComment('');

    // 저장 후 새로고침(간단 MVP)
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold">기록하기 ✍️</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>감상 기록하기</DialogTitle>
        </DialogHeader>

        {/* 영화 제목 / 포스터 URL (임시) */}
        <Input placeholder="영화 제목" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2" />
        <Input placeholder="포스터 URL (선택)" value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} className="mt-2" />

        {/* 별점 */}
        <div className="flex gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button key={num} onClick={() => setRating(num)} className={`text-2xl ${num <= rating ? 'text-yellow-400' : 'text-gray-400'}`}>
              ★
            </button>
          ))}
        </div>

        {/* 감정 선택 */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          {Object.keys(emotions).map((emo) => (
            <button
              key={emo}
              onClick={() => setEmotion(emo)}
              className={`py-2 rounded-lg text-sm font-medium ${
                emotion === emo ? `${emotions[emo as keyof typeof emotions]} ring-2 ring-violet-400` : 'bg-muted text-muted-foreground'
              }`}
            >
              {emo}
            </button>
          ))}
        </div>

        {/* 한줄 감상 */}
        <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="한줄 감상을 남겨주세요..." className="mt-3" />

        <Button onClick={handleSubmit} className="w-full mt-4 bg-violet-600">
          저장하기
        </Button>
      </DialogContent>
    </Dialog>
  );
}
