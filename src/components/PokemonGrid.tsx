'use client'

import { X } from 'lucide-react'
import { type ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

import type { Pokemon } from '@/types/pokemon'

import { usePokemon } from '@/hooks/usePokemon'

import { Input } from './ui/input'

const SKELETON_COUNT = 20

export const colors: Record<string, string> = {
  Bug: 'bg-lime-500 hover:bg-lime-600',
  Dark: 'bg-slate-800 hover:bg-slate-900',
  Dragon: 'bg-indigo-700 hover:bg-indigo-800',
  Electric: 'bg-yellow-500 hover:bg-yellow-600',
  Fairy: 'bg-pink-300 hover:bg-pink-400',
  Fighting: 'bg-red-700 hover:bg-red-800',
  Fire: 'bg-red-500 hover:bg-red-600',
  Flying: 'bg-indigo-400 hover:bg-indigo-500',
  Ghost: 'bg-purple-700 hover:bg-purple-800',
  Grass: 'bg-green-500 hover:bg-green-600',
  Ground: 'bg-amber-600 hover:bg-amber-700',
  Ice: 'bg-cyan-300 hover:bg-cyan-400',
  Normal: 'bg-slate-400 hover:bg-slate-500',
  Poison: 'bg-purple-500 hover:bg-purple-600',
  Psychic: 'bg-pink-500 hover:bg-pink-600',
  Rock: 'bg-amber-700 hover:bg-amber-800',
  Steel: 'bg-slate-500 hover:bg-slate-600',
  Water: 'bg-blue-500 hover:bg-blue-600'
}

export function getTypeColor(type: string) {
  return colors[type] ?? 'bg-slate-400 hover:bg-slate-500'
}

export default function PokemonGrid() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const { hasNext, isLoading, loadMore, pokemon } = usePokemon(debouncedSearch)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setDebouncedSearch(value), 300)
  }, [])

  const handleClear = useCallback(() => {
    clearTimeout(debounceRef.current)
    setDebouncedSearch('')
    setSearch('')
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) loadMore()
      },
      { rootMargin: '0px 0px 200px 0px', threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore])

  const initialLoading = isLoading && pokemon.length === 0

  return (
    <div className="min-h-screen bg-pc-bg text-white">
      <div className="flex justify-center px-4 pb-4 pt-6">
        <div className="relative w-full max-w-[400px]">
          <Input
            className="border-pc-border bg-pc-card pr-8 text-white placeholder:text-white/40"
            onChange={handleChange}
            placeholder="Search for a Pokémon..."
            type="text"
            value={search}
          />
          {search && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              onClick={handleClear}
              type="button"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {initialLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div
                className="aspect-[3/4] animate-pulse rounded-lg border border-pc-border bg-pc-card"
                key={i}
              />
            ))
          : pokemon.map(p => <PokemonTile key={p.id} pokemon={p} />)}
      </div>

      {isLoading && pokemon.length > 0 && (
        <div className="flex justify-center py-6">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-pc-border border-t-pc-accent" />
        </div>
      )}

      {!hasNext && !isLoading && pokemon.length > 0 && (
        <p className="py-6 text-center text-white/60">No more Pokémon found.</p>
      )}

      <div ref={sentinelRef} />
    </div>
  )
}

function PokemonTile({ pokemon: p }: { pokemon: Pokemon }) {
  return (
    <div className="flex aspect-[3/4] flex-col items-center gap-2 rounded-lg border border-pc-border bg-pc-card p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt={p.name} className="min-h-0 w-full flex-1 object-contain" src={p.imageUrl} />
      <p className="text-center text-sm font-medium capitalize text-white">{p.name}</p>
      <div className="flex flex-wrap justify-center gap-1">
        {p.types.map(type => (
          <span className={`rounded px-1.5 py-0.5 text-xs text-white ${getTypeColor(type)}`} key={type}>
            {type}
          </span>
        ))}
      </div>
    </div>
  )
}
