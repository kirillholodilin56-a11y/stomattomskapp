"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Drawer } from "@/components/ui/Modal";
import { useServices } from "@/context/ServicesContext";
import { formatPrice } from "@/lib/utils";
import type { ClinicService } from "@/types";
import { motion } from "framer-motion";
import { Pencil, Tag } from "lucide-react";

export default function ClinicServicesPage() {
  const { services, updateServicePrice, toggleServiceActive } = useServices();
  const [editing, setEditing] = useState<ClinicService | null>(null);
  const [priceInput, setPriceInput] = useState("");

  const openEdit = (service: ClinicService) => {
    setEditing(service);
    setPriceInput(String(service.price));
  };

  const handleSave = () => {
    if (!editing) return;
    const price = parseInt(priceInput, 10);
    if (!isNaN(price) && price > 0) {
      updateServicePrice(editing.id, price);
    }
    setEditing(null);
  };

  return (
    <div className="relative space-y-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="page-title">Услуги и цены</h1>
        <p className="page-subtitle">
          Редактирование локально · без сохранения на сервер
        </p>
      </motion.div>

      <div className="space-y-3">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card
              onClick={() => openEdit(service)}
              className="flex cursor-pointer flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium text-slate-900">{service.name}</h3>
                  {service.promotion && (
                    <Badge variant="warning">
                      <Tag className="mr-1 inline h-3 w-3" />
                      Акция
                    </Badge>
                  )}
                  <Badge variant={service.active ? "success" : "default"}>
                    {service.active ? "Активна" : "Неактивна"}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {service.doctorName} · {service.specialty} · {service.duration}{" "}
                  мин
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-teal-700">
                  {formatPrice(service.price)}
                </span>
                <Pencil className="h-4 w-4 text-slate-400" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Drawer
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Редактировать услугу"
      >
        {editing && (() => {
          const current = services.find((s) => s.id === editing.id) ?? editing;
          return (
          <div className="space-y-4">
            <p className="font-medium text-slate-900">{current.name}</p>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Цена, ₽
              </label>
              <input
                type="number"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={current.active}
                onChange={() => toggleServiceActive(current.id)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              Услуга активна
            </label>
            <p className="text-xs text-slate-400">
              Изменения сохраняются только в браузере (демо).
            </p>
            <Button className="w-full" onClick={handleSave}>
              Сохранить
            </Button>
          </div>
          );
        })()}
      </Drawer>
    </div>
  );
}
