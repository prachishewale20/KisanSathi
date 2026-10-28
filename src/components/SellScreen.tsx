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
  X
} from 'lucide-react';

export default function SellScreen() {
  const { plan, language, t } = useApp();

  const [listings, setListings] = useState<SellListing[]>([]);
  const [filterCrop, setFilterCrop] = useState<string>('all');
  const [filterDistrict, setFilterDistrict] = useState<string>('all');
  const [showPostModal, setShowPostModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State
  const [formCrop, setFormCrop] = useState<CropId>(plan?.crop || 'tomato');
  const [formQty, setFormQty] = useState<string>('50');
  const [formPrice, setFormPrice] = useState<string>('1900');
  const [formVillage, setFormVillage] = useState<string>(plan?.village || 'Ozar');
  const [formDistrict, setFormDistrict] = useState<string>(plan?.district || 'Nashik');
  const [formPhone, setFormPhone] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch listings on mount or filter change
  const fetchListings = async () => {
    try {
      const url = `/api/listings?crop=${filterCrop}&district=${filterDistrict}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setListings(data.listings || []);
      }
    } catch (err) {
      console.warn('Failed to load listings', err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [filterCrop, filterDistrict]);

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
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: formCrop,
          quantityQuintals: qty,
          askingPricePerQuintal: price,
          village: formVillage.trim(),
          district: formDistrict.trim(),
          phone: cleanPhone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || 'Failed to submit listing');
        return;
      }

      // Prepend newly submitted listing to state immediately (FR-SL2, Test Case T8)
      if (data.listing) {
        setListings((prev) => [data.listing, ...prev]);
      }

      setShowPostModal(false);
      setFormPhone('');
    } catch (err) {
      setFormError('Network error while posting listing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyPhoneNumber = (phone: string, id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(phone);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

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

      {/* Listings Board (FR-SL2) */}
      <div className="space-y-3">
        {listings.length === 0 ? (
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
          listings.map((item) => {
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
