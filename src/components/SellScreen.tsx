'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CROPS_DATA, MAHARASHTRA_DISTRICTS } from '../data/crops';
import { SellListing, CropId } from '../types';
import {
  ShoppingBag,
  PlusCircle,
  Phone,
  Copy,
  Check,
  Filter,
  AlertCircle,
  MapPin,
  Clock,
  Sparkles,
  ShieldAlert,
  X,
  Trash2
} from 'lucide-react';

const LISTINGS_STORAGE_KEY = 'kisansaathi_listings_v1';

// Seed demo listings to ensure initial marketplace presence
const INITIAL_DEMO_LISTINGS: SellListing[] = [
  {
    id: 'list-1',
    crop: 'tomato',
    quantityQuintals: 45,
    askingPricePerQuintal: 1950,
    village: 'Ozar Mig',
    district: 'Nashik',
    phone: '9822014589',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'list-2',
    crop: 'onion',
    quantityQuintals: 120,
    askingPricePerQuintal: 2350,
    village: 'Lasalgaon',
    district: 'Nashik',
    phone: '9423187652',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: 'list-3',
    crop: 'soybean',
    quantityQuintals: 60,
    askingPricePerQuintal: 4700,
    village: 'Ausa',
    district: 'Latur',
    phone: '9765432109',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
  },
  {
    id: 'list-4',
    crop: 'tomato',
    quantityQuintals: 80,
    askingPricePerQuintal: 1850,
    village: 'Manchar',
    district: 'Pune',
    phone: '9158765432',
    createdAt: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
  },
];

export default function SellScreen() {
  const { plan, language, t } = useApp();

  const [allListings, setAllListings] = useState<SellListing[]>([]);
  const [filterCrop, setFilterCrop] = useState<string>('all');
  const [filterDistrict, setFilterDistrict] = useState<string>('all');
  const [showPostModal, setShowPostModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Form State
  const [formCrop, setFormCrop] = useState<CropId>(plan?.crop || 'tomato');
  const [formQty, setFormQty] = useState<string>('50');
  const [formPrice, setFormPrice] = useState<string>('1900');
  const [formVillage, setFormVillage] = useState<string>(plan?.village || 'Ozar');
  const [formDistrict, setFormDistrict] = useState<string>(plan?.district || 'Nashik');
  const [formPhone, setFormPhone] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load listings from localStorage on mount (Phase 2 Item 8)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LISTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllListings(parsed);
          return;
        }
      }
      // If not stored, initialize with default demo listings
      setAllListings(INITIAL_DEMO_LISTINGS);
      localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LISTINGS));
    } catch (e) {
      console.warn('Failed to load listings from localStorage', e);
      setAllListings(INITIAL_DEMO_LISTINGS);
    }
  }, []);

  const saveListings = (updated: SellListing[]) => {
    setAllListings(updated);
    try {
      localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save listings to localStorage', e);
    }
  };

  const handlePostListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation checks (FR-SL4, Test Case T7)
    const qty = parseFloat(formQty);
    if (isNaN(qty) || qty <= 0) {
      setFormError('Please enter a valid positive quantity in quintals.');
      return;
    }

    const price = parseFloat(formPrice);
    if (isNaN(price) || price <= 0) {
      setFormError('Please enter a valid asking price per quintal.');
      return;
    }

    if (!formVillage.trim()) {
      setFormError('Village or town name is required.');
      return;
    }

    const cleanPhone = formPhone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setFormError('Please enter a valid 10-digit Indian mobile number (e.g., 9822123456).');
      return;
    }

    setIsSubmitting(true);
    const newListing: SellListing = {
      id: `list-${Date.now()}`,
      crop: formCrop,
      quantityQuintals: qty,
      askingPricePerQuintal: price,
      village: formVillage.trim(),
      district: formDistrict.trim(),
      phone: cleanPhone,
      createdAt: new Date().toISOString(),
    };

    try {
      // Save to localStorage immediately (FR-SL2, local persistence)
      const updated = [newListing, ...allListings];
      saveListings(updated);

      // Also notify backend API
      fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newListing),
      }).catch((err) => console.warn('Backend sync failed, stored locally', err));

      setShowPostModal(false);
      setFormPhone('');
      setFeedbackMessage('Listing published successfully!');
      setTimeout(() => setFeedbackMessage(null), 3000);
    } catch (err) {
      setFormError('Error saving listing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteListing = (id: string) => {
    if (window.confirm(t('deleteConfirm'))) {
      const updated = allListings.filter((item) => item.id !== id);
      saveListings(updated);

      // Also trigger API delete
      fetch(`/api/listings?id=${id}`, { method: 'DELETE' }).catch((err) =>
        console.warn('API delete failed', err)
      );

      setFeedbackMessage(t('listingDeleted'));
      setTimeout(() => setFeedbackMessage(null), 3000);
    }
  };

  const copyPhoneNumber = (phone: string, id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(phone);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Filter listings based on current filter state
  const displayedListings = allListings.filter((item) => {
    if (filterCrop !== 'all' && item.crop !== filterCrop) return false;
    if (
      filterDistrict !== 'all' &&
      item.district.toLowerCase() !== filterDistrict.toLowerCase()
    )
      return false;
    return true;
  });

  return (
    <div className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full animate-fade-in pb-24 space-y-5">
      {/* Top Banner */}
      <div className="bg-sage/70 rounded-card p-4 border border-forest/15">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-forest text-white">
              <ShoppingBag className="w-5 h-5 text-amber" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold font-display text-forest">
                {t('sellHeading')}
              </h2>
              <p className="text-xs md:text-sm text-charcoal-muted">
                {t('sellSubheading')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowPostModal(true)}
            className="min-h-[44px] px-3.5 py-2 bg-forest hover:bg-forest-dark text-white rounded-lg text-xs md:text-sm font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-amber" />
            <span>{t('btnPostListing')}</span>
          </button>
        </div>

        {/* Disclaimer Bar (FR-SL5) */}
        <div className="mt-3 p-2 bg-amber-50/80 rounded-lg border border-amber-200/60 text-[11px] text-amber-900 flex items-start gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
          <span>{t('sellDisclaimer')}</span>
        </div>
      </div>

      {/* Filter Bar (FR-SL3) */}
      <div className="bg-white rounded-card p-3 border border-[#D5E0D7] shadow-xs flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 text-xs text-charcoal-muted">
          <Filter className="w-3.5 h-3.5 text-forest" />
          <span className="font-semibold">Filter Produce:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Crop filter */}
          <select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            className="min-h-[38px] px-2.5 py-1 rounded-lg border border-[#C8D6CA] bg-white text-xs font-medium text-charcoal focus:ring-2 focus:ring-forest"
          >
            <option value="all">{t('filterAllCrops')}</option>
            <option value="tomato">Tomato (टमाटर)</option>
            <option value="onion">Onion (प्याज)</option>
            <option value="soybean">Soybean (सोयाबीन)</option>
          </select>

          {/* District filter */}
          <select
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
            className="min-h-[38px] px-2.5 py-1 rounded-lg border border-[#C8D6CA] bg-white text-xs font-medium text-charcoal focus:ring-2 focus:ring-forest"
          >
            <option value="all">{t('filterAllDistricts')}</option>
            {MAHARASHTRA_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action feedback toast */}
      {feedbackMessage && (
        <div className="p-3 bg-forest text-white text-xs font-semibold rounded-xl shadow-md flex items-center justify-between animate-fade-in">
          <span>{feedbackMessage}</span>
          <button
            onClick={() => setFeedbackMessage(null)}
            className="text-amber hover:text-white ml-2 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Listings Board (FR-SL2, Phase 2 Item 6) */}
      <div className="space-y-3">
        {displayedListings.length === 0 ? (
          <div className="bg-white rounded-card p-8 text-center border border-[#D5E0D7]">
            <ShoppingBag className="w-8 h-8 text-charcoal-light mx-auto mb-2" />
            <p className="text-sm font-semibold text-charcoal mb-3">
              {t('listingsEmpty')}
            </p>
            <button
              onClick={() => setShowPostModal(true)}
              className="px-4 py-2 bg-forest text-white rounded-lg text-xs font-bold"
            >
              Post First Listing
            </button>
          </div>
        ) : (
          displayedListings.map((item) => {
            const cropInfo = CROPS_DATA[item.crop] || CROPS_DATA.tomato;
            const emoji = item.crop === 'tomato' ? '🍅' : item.crop === 'onion' ? '🧅' : '🌱';
            const isJustCopied = copiedId === item.id;

            const timeStr = new Date(item.createdAt).toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={item.id}
                className="bg-white rounded-card p-4 border border-[#D5E0D7] shadow-sm hover:border-forest/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                {/* Produce & Location Info */}
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-base text-forest">
                        {cropInfo.name[language]}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber/20 text-charcoal">
                        {item.quantityQuintals} Quintals
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-muted mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-forest" />
                        {item.village}, {item.district}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-charcoal-light">
                        <Clock className="w-3 h-3" />
                        {timeStr}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Asking Price & Contact Buttons */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EAEFEA]">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-charcoal-muted block">
                      Asking Price
                    </span>
                    <span className="text-base font-extrabold font-display text-forest">
                      ₹{item.askingPricePerQuintal}
                    </span>
                    <span className="text-[10px] text-charcoal-light block">
                      / Quintal
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Call Farmer */}
                    <a
                      href={`tel:${item.phone}`}
                      className="min-h-[42px] px-3 py-2 bg-forest text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs hover:bg-forest-dark transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber" />
                      <span>{t('callSeller')}</span>
                    </a>

                    {/* Copy Phone */}
                    <button
                      onClick={() => copyPhoneNumber(item.phone, item.id)}
                      className="min-h-[42px] p-2 bg-sage hover:bg-sage-dark text-forest rounded-lg text-xs font-semibold transition-all border border-forest/20"
                      title={t('copyPhone')}
                    >
                      {isJustCopied ? (
                        <Check className="w-4 h-4 text-forest" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {/* Delete Listing Button (Phase 2 Item 6) */}
                    <button
                      onClick={() => handleDeleteListing(item.id)}
                      className="min-h-[42px] p-2 bg-clay/10 hover:bg-clay/20 text-clay rounded-lg text-xs font-semibold transition-all border border-clay/30"
                      title={t('deleteListing')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* "Coming Soon" V2 Features Badge (FR-SL6, C Priority) */}
      <div className="p-3.5 bg-sage/40 rounded-card border border-forest/15 text-xs text-charcoal">
        <div className="flex items-center gap-1.5 text-forest font-bold mb-1">
          <Sparkles className="w-4 h-4 text-amber" />
          <span>{t('comingSoonFeatures')}</span>
        </div>
        <p className="text-[11px] text-charcoal-muted">
          In Phase 2, verified institutional buyers can lock digital escrow contracts directly with farmers.
        </p>
      </div>

      {/* Modal: Post New Listing (FR-SL1, FR-SL4) */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-card p-5 max-w-md w-full shadow-2xl border border-forest/20 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
              <h3 className="font-display font-bold text-base text-forest flex items-center gap-1.5">
                <ShoppingBag className="w-5 h-5 text-amber" />
                <span>{t('modalPostTitle')}</span>
              </h3>
              <button
                onClick={() => setShowPostModal(false)}
                className="p-1 text-charcoal-muted hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mt-3 p-2.5 bg-clay/10 border border-clay/30 rounded-lg text-xs text-clay font-medium flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handlePostListing} className="space-y-3.5 mt-3">
              {/* Crop Select */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  {t('formCrop')}
                </label>
                <select
                  value={formCrop}
                  onChange={(e) => setFormCrop(e.target.value as CropId)}
                  className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-[#C8D6CA] text-xs font-medium focus:ring-2 focus:ring-forest"
                >
                  <option value="tomato">Tomato (टमाटर)</option>
                  <option value="onion">Onion (प्याज)</option>
                  <option value="soybean">Soybean (सोयाबीन)</option>
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  {t('formQuantity')}
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={formQty}
                  onChange={(e) => setFormQty(e.target.value)}
                  className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-[#C8D6CA] text-xs font-semibold focus:ring-2 focus:ring-forest"
                  required
                />
              </div>

              {/* Asking Price */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  {t('formPrice')}
                </label>
                <input
                  type="number"
                  min="100"
                  step="10"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-[#C8D6CA] text-xs font-semibold focus:ring-2 focus:ring-forest"
                  required
                />
              </div>

              {/* Village & District */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    {t('formVillage')}
                  </label>
                  <input
                    type="text"
                    value={formVillage}
                    onChange={(e) => setFormVillage(e.target.value)}
                    placeholder="e.g. Ozar"
                    className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-[#C8D6CA] text-xs focus:ring-2 focus:ring-forest"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    {t('formDistrict')}
                  </label>
                  <select
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-[#C8D6CA] text-xs focus:ring-2 focus:ring-forest"
                  >
                    {MAHARASHTRA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mobile Phone (FR-SL4, Test Case T7) */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  {t('formPhone')}
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="e.g. 9822123456 (10 digits)"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-[#C8D6CA] text-xs font-mono font-bold tracking-wider focus:ring-2 focus:ring-forest"
                  required
                />
                <span className="text-[10px] text-charcoal-muted mt-0.5 block">
                  {t('formPhoneHelp')}
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 min-h-[44px] px-3 py-2 border border-[#D5E0D7] rounded-lg text-xs font-semibold text-charcoal"
                >
                  {t('btnCancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 min-h-[44px] px-3 py-2 bg-forest hover:bg-forest-dark text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  {isSubmitting ? 'Posting...' : t('btnSubmitListing')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

