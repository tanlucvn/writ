import type { Note } from "@/types";

export interface WriteTemplate extends Note {
  desc: string;
}

export const explorerTemplates: WriteTemplate[] = [
  {
    id: "template-1",
    title: "Daily Journal",
    desc: "Track your daily mood, gratitude, reflections, and goals with highlights and tasks.",
    content: `
      <h2>Daily <mark>Journal</mark></h2>
      <p><strong>Date:</strong> <span class="placeholder-text">[Enter Date, e.g. May 22, 2025]</span></p>

      <h3>How are you feeling today?</h3>
      <p class="placeholder-text">Write about your mood, energy, and thoughts...</p>

      <h3>Gratitude</h3>
      <ul>
        <li>I am grateful for...</li>
        <li>Something good that happened...</li>
        <li>People I appreciate...</li>
      </ul>

      <h3>Reflection & Highlights</h3>
      <p class="placeholder-text">What went well? Any challenges?</p>

      <h3>Goals for Tomorrow</h3>
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="false"><label><input type="checkbox"><span></span></label><div><span class="placeholder-text">Goal 1...</span></div></li>
        <li data-type="taskItem" data-checked="false"><label><input type="checkbox"><span></span></label><div><span class="placeholder-text">Goal 2...</span></div></li>
      </ul>
    `,
    createdAt: new Date(0).toLocaleString(),
    updatedAt: new Date(0).toLocaleString(),
    synced: 0,
    inTrash: false,
    parentId: "",
    syncedAt: null,
  },
  {
    id: "template-2",
    title: "My To-Do List",
    desc: "Organize your tasks with checkboxes and priorities.",
    content: `
      <h2>My To-do List</h2>
      <p><em>Use checkboxes to mark tasks as done.</em></p>
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="false"><label><input type="checkbox"><span></span></label><div>Write project proposal</div></li>
        <li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked><span></span></label><div>Urgent: Schedule team meeting</div></li>
        <li data-type="taskItem" data-checked="false"><label><input type="checkbox"><span></span></label><div>Reply to important emails</div></li>
        <li data-type="taskItem" data-checked="false"><label><input type="checkbox"><span></span></label><div><span class="placeholder-text">Add new task...</span></div></li>
      </ul>
    `,
    createdAt: new Date(0).toLocaleString(),
    updatedAt: new Date(0).toLocaleString(),
    synced: 0,
    inTrash: false,
    parentId: "",
    syncedAt: null,
  },
  {
    id: "template-3",
    title: "Meeting Notes",
    desc: "Capture meeting details, attendees, and action items with highlights and tasks.",
    content: `
      <h2>Meeting Notes</h2>
      <p><strong>Date:</strong> <span class="placeholder-text">[Enter date]</span></p>

      <h3>Attendees</h3>
      <ul>
        <li><span class="placeholder-text">Name 1</span></li>
        <li><span class="placeholder-text">Name 2</span></li>
      </ul>

      <h3>Agenda</h3>
      <p class="placeholder-text">List agenda topics here...</p>

      <h3>Notes</h3>
      <p class="placeholder-text">Write down key points and discussion...</p>

      <h3>Action Items</h3>
      <ul data-type="taskList">
        <li data-type="taskItem" data-checked="false"><label><input type="checkbox"><span></span></label><div>Follow up on project X</div></li>
        <li data-type="taskItem" data-checked="false"><label><input type="checkbox"><span></span></label><div>Assign tasks to team members</div></li>
      </ul>
    `,
    createdAt: new Date(0).toLocaleString(),
    updatedAt: new Date(0).toLocaleString(),
    synced: 0,
    inTrash: false,
    parentId: "",
    syncedAt: null,
  },
];
