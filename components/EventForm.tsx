import type { Event } from "@/lib/types";

export default function EventForm({
  event,
  action,
  submitLabel
}: {
  event?: Partial<Event>;
  action: string;
  submitLabel: string;
}) {
  return (
    <form className="grid gap-4" action={action} method="post">
      <div className="grid gap-2">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required defaultValue={event?.title ?? ""} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="slug">Slug</label>
        <input id="slug" name="slug" required defaultValue={event?.slug ?? ""} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={4} required defaultValue={event?.description ?? ""} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="dateStart">Start date/time</label>
        <input id="dateStart" type="datetime-local" name="dateStart" required defaultValue={event?.dateStart ?? ""} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="dateEnd">End date/time (optional)</label>
        <input id="dateEnd" type="datetime-local" name="dateEnd" defaultValue={event?.dateEnd ?? ""} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="timezone">Timezone</label>
        <input id="timezone" name="timezone" required defaultValue={event?.timezone ?? "US/Eastern"} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="locationName">Location name</label>
        <input id="locationName" name="locationName" required defaultValue={event?.locationName ?? ""} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="address">Address (optional)</label>
        <input id="address" name="address" defaultValue={event?.address ?? ""} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="googleMapsLink">Google Maps link (optional)</label>
        <input id="googleMapsLink" name="googleMapsLink" defaultValue={event?.googleMapsLink ?? ""} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="capacity">Capacity (optional)</label>
        <input id="capacity" name="capacity" type="number" min="1" defaultValue={event?.capacity ?? ""} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="cost">Cost (optional)</label>
        <input id="cost" name="cost" type="number" min="0" step="0.01" defaultValue={event?.cost ?? ""} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="difficulty">Difficulty</label>
        <select id="difficulty" name="difficulty" defaultValue={event?.difficulty ?? "Moderate"}>
          <option>Easy</option>
          <option>Moderate</option>
          <option>Challenging</option>
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="distance">Distance (optional)</label>
        <input id="distance" name="distance" defaultValue={event?.distance ?? ""} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="elevationGain">Elevation gain (optional)</label>
        <input id="elevationGain" name="elevationGain" defaultValue={event?.elevationGain ?? ""} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="packingList">Packing list (optional)</label>
        <textarea id="packingList" name="packingList" rows={3} defaultValue={event?.packingList ?? ""} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="image">Image URL (optional)</label>
        <input id="image" name="image" defaultValue={event?.image ?? ""} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="accessCode">Access code (optional)</label>
        <input id="accessCode" name="accessCode" defaultValue={event?.accessCode ?? ""} />
      </div>
      <div className="grid gap-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isPrivate" defaultChecked={event?.isPrivate ?? false} />
          Private (invite-only)
        </label>
      </div>
      <div className="grid gap-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="published" defaultChecked={event?.published ?? true} />
          Published
        </label>
      </div>
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
