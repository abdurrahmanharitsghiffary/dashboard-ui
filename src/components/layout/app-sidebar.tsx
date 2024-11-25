'use client';

import {
  ArchiveX,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Command,
  File,
  Frame,
  Inbox,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { Icons } from '@/components/icons';
import UserNav from '@/components/layout/user-nav';
import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavSecondary } from '@/components/nav-secondary';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

// This is sample data
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Inbox',
      url: '#',
      icon: Inbox,
      isActive: true,
    },
    {
      title: 'Drafts',
      url: '#',
      icon: File,
      isActive: false,
    },
    {
      title: 'Sent',
      url: '#',
      icon: Send,
      isActive: false,
    },
    {
      title: 'Junk',
      url: '#',
      icon: ArchiveX,
      isActive: false,
    },
    {
      title: 'Trash',
      url: '#',
      icon: Trash2,
      isActive: false,
    },
  ],
};

const secondarySidebarData = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard/overview',
      icon: Icons['dashboard'],
      items: [],
    },
    {
      title: 'Employee',
      url: '/dashboard/employee',
      icon: BriefcaseBusiness,
      items: [
        {
          title: 'Overview',
          url: '/dashboard/employee',
        },
        {
          title: 'New',
          url: '/dashboard/employee/new',
        },
      ],
    },
    {
      title: 'Product',
      url: '/dashboard/product',
      icon: ShoppingBag,
      items: [
        {
          title: 'Overview',
          url: '/dashboard/product',
        },
        {
          title: 'New',
          url: '/dashboard/product/new',
        },
      ],
    },
    {
      title: 'Account',
      url: '#', // Placeholder as there is no direct link for the parent
      icon: Icons['billing'],
      items: [
        {
          title: 'Profile',
          url: '/dashboard/profile',
          icon: Icons['userPen'],
          shortcut: ['m', 'm'],
        },
        {
          title: 'Login',
          shortcut: ['l', 'l'],
          url: '/',
          icon: Icons['login'],
        },
      ],
    },
    {
      title: 'Kanban',
      url: '/dashboard/kanban',
      icon: Icons['kanban'],
      items: [],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

function filterSecondarySidebarData(
  data: typeof secondarySidebarData,
  searchString: string,
) {
  if (!searchString) return data; // Return original data if no search string

  // Function to filter items based on search string
  const filterItems = (items: { title: string; url: string }[]) =>
    items.filter((item) =>
      item.title.toLowerCase().includes(searchString.toLowerCase()),
    );

  return {
    navMain: data.navMain
      .map((main) => ({
        ...main,
        items: main.items ? filterItems(main.items) : undefined,
      }))
      .filter(
        (main) =>
          main.title.toLowerCase().includes(searchString.toLowerCase()) ||
          (main.items && main.items.length > 0),
      ),
    navSecondary: data.navSecondary.filter((secondary) =>
      secondary.title.toLowerCase().includes(searchString.toLowerCase()),
    ),
    projects: data.projects.filter((project) =>
      project.name.toLowerCase().includes(searchString.toLowerCase()),
    ),
  };
}

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { register, watch } = useForm({ values: { input: '' } });

  const input = watch('input');
  const sidebarSecondaryData = React.useMemo(
    () => filterSecondarySidebarData(secondarySidebarData, input),
    [input],
  );
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const { setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                      }}
                      isActive={activeItem.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <UserNav />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem.title}
            </div>
          </div>
          <SidebarInput
            placeholder="Type to search..."
            {...register('input')}
          />
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea className="h-[200px] flex-1">
            <SidebarGroup className="px-0">
              <SidebarGroupContent>
                <NavMain items={sidebarSecondaryData.navMain} />
                <NavProjects projects={sidebarSecondaryData.projects} />
                <NavSecondary
                  items={sidebarSecondaryData.navSecondary}
                  className="mt-auto"
                />
              </SidebarGroupContent>
            </SidebarGroup>
          </ScrollArea>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
