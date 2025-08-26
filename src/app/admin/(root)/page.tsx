import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminStatsCard from "@/components/admin/stats-card";
import AdminRecentEvents from "@/components/admin/recent-events";
import { Calendar, Users, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";
import { getEvents } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  // Get statistics
  const supabase = await createClient();
  const allEvents = await getEvents();
  const upcomingEvents = allEvents.filter(
    (event) => event.status === "upcoming"
  );
  const completedEvents = allEvents.filter(
    (event) => event.status === "completed"
  );

  // Get admin users count
  const { count: adminCount } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .in("role", ["admin", "super_admin"]);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-geist text-3xl font-bold text-primary">
            Admin Dashboard
          </h1>
          <p className="font-manrope text-muted-foreground">
            Manage ITSA events and administration
          </p>
        </div>
        <Button asChild className="font-manrope">
          <Link href="/admin/events/new">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AdminStatsCard
          title="Total Events"
          value={allEvents.length}
          description="All events in system"
          icon={Calendar}
        />
        <AdminStatsCard
          title="Upcoming Events"
          value={upcomingEvents.length}
          description="Events scheduled"
          icon={TrendingUp}
        />
        <AdminStatsCard
          title="Completed Events"
          value={completedEvents.length}
          description="Past events"
          icon={Calendar}
        />
        <AdminStatsCard
          title="Admin Users"
          value={adminCount || 0}
          description="System administrators"
          icon={Users}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Events */}
        <div className="lg:col-span-2">
          <AdminRecentEvents />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-geist">Quick Actions</CardTitle>
            <CardDescription className="font-manrope">
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              asChild
              variant="outline"
              className="w-full justify-start font-manrope bg-transparent"
            >
              <Link href="/admin/events/new">
                <Plus className="h-4 w-4 mr-2" />
                Create New Event
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start font-manrope bg-transparent"
            >
              <Link href="/admin/events">
                <Calendar className="h-4 w-4 mr-2" />
                Manage Events
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start font-manrope bg-transparent"
            >
              <Link href="/admin/users">
                <Users className="h-4 w-4 mr-2" />
                Manage Admin Users
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start font-manrope bg-transparent"
            >
              <Link href="/" target="_blank">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Public Site
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="font-geist">System Status</CardTitle>
          <CardDescription className="font-manrope">
            Current system information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="font-manrope text-sm font-medium">Database</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-secondary rounded-full"></div>
                <span className="font-manrope text-sm text-muted-foreground">
                  Connected
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-manrope text-sm font-medium">Authentication</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-secondary rounded-full"></div>
                <span className="font-manrope text-sm text-muted-foreground">
                  Active
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-manrope text-sm font-medium">Last Updated</p>
              <span className="font-manrope text-sm text-muted-foreground">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
