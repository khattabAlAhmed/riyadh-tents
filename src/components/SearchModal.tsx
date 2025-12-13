'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Search, X, FileText, Home, Wrench } from 'lucide-react';
import Link from 'next/link';
import { searchAll, type SearchResults, type SearchResultItem } from '@/actions/search';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchResultSkeleton = () => (
    <div className="flex items-center gap-3 p-3 animate-pulse">
        <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-full" />
        </div>
    </div>
);

const SearchResultItemComponent = ({
    item,
    locale,
    onClose
}: {
    item: SearchResultItem;
    locale: string;
    onClose: () => void;
}) => {
    const title = locale === 'ar' ? item.titleAr : item.titleEn;
    const description = locale === 'ar' ? item.descriptionAr : item.descriptionEn;
    const slug = locale === 'ar' ? item.slugAr : item.slugEn;

    const getHref = () => {
        switch (item.type) {
            case 'post': return `/blog/${slug}`;
            case 'tent': return `/tents/${slug}`;
            case 'service': return `/services/${slug}`;
        }
    };

    const getIcon = () => {
        switch (item.type) {
            case 'post': return <FileText className="w-4 h-4" />;
            case 'tent': return <Home className="w-4 h-4" />;
            case 'service': return <Wrench className="w-4 h-4" />;
        }
    };

    return (
        <Link
            href={getHref()}
            onClick={onClose}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
        >
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img
                    src={item.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span
                        className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                        style={{
                            backgroundColor: 'var(--muted)',
                            color: 'var(--muted-foreground)'
                        }}
                    >
                        {getIcon()}
                    </span>
                    <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {title}
                    </h4>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const locale = useLocale();
    const t = useTranslations('Search');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResults | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery('');
            setResults(null);
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Debounced search
    const handleSearch = useCallback(async (searchQuery: string) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (searchQuery.trim().length < 2) {
            setResults(null);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        debounceRef.current = setTimeout(async () => {
            try {
                const searchResults = await searchAll(searchQuery);
                setResults(searchResults);
            } catch (error) {
                console.error('Search error:', error);
                setResults({ posts: [], tents: [], services: [], totalCount: 0 });
            } finally {
                setIsSearching(false);
            }
        }, 300);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        handleSearch(value);
    };

    if (!isOpen) return null;

    const hasResults = results && results.totalCount > 0;
    const showNoResults = results && results.totalCount === 0 && query.trim().length >= 2 && !isSearching;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative flex items-start justify-center pt-20 md:pt-32 px-4">
                <div
                    className="w-full max-w-2xl bg-background rounded-2xl shadow-2xl border border-border overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Search Input */}
                    <div className="flex items-center gap-3 p-4 border-b border-border">
                        <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder={t('placeholder')}
                            className="flex-1 bg-transparent text-foreground text-lg outline-none placeholder:text-muted-foreground"
                        />
                        {query && (
                            <button
                                onClick={() => {
                                    setQuery('');
                                    setResults(null);
                                    inputRef.current?.focus();
                                }}
                                className="p-1 hover:bg-accent rounded-md transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        )}
                    </div>

                    {/* Results */}
                    <div className="max-h-[60vh] overflow-y-auto">
                        {/* Loading State */}
                        {isSearching && (
                            <div className="p-4 space-y-2">
                                <SearchResultSkeleton />
                                <SearchResultSkeleton />
                                <SearchResultSkeleton />
                            </div>
                        )}

                        {/* No Results */}
                        {showNoResults && (
                            <div className="p-8 text-center text-muted-foreground">
                                {t('noResults')}
                            </div>
                        )}

                        {/* Results */}
                        {hasResults && !isSearching && (
                            <div className="p-2">
                                {/* Posts */}
                                {results.posts.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                                            {t('posts')}
                                        </h3>
                                        {results.posts.map((item) => (
                                            <SearchResultItemComponent
                                                key={item.id}
                                                item={item}
                                                locale={locale}
                                                onClose={onClose}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Tents */}
                                {results.tents.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                                            {t('tents')}
                                        </h3>
                                        {results.tents.map((item) => (
                                            <SearchResultItemComponent
                                                key={item.id}
                                                item={item}
                                                locale={locale}
                                                onClose={onClose}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Services */}
                                {results.services.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                                            {t('services')}
                                        </h3>
                                        {results.services.map((item) => (
                                            <SearchResultItemComponent
                                                key={item.id}
                                                item={item}
                                                locale={locale}
                                                onClose={onClose}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Initial State - Show hint */}
                        {!results && !isSearching && query.length < 2 && (
                            <div className="p-8 text-center text-muted-foreground text-sm">
                                {locale === 'ar' ? 'اكتب حرفين على الأقل للبحث' : 'Type at least 2 characters to search'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
