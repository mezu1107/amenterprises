"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { AnimatedCounter } from "@/components/animated-counter"
import { StatusBadge } from "@/components/status-badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import { formatCurrency, getRelativeTime } from "@/lib/mock-api"
import { useAdminClients, useAdminProjects, useAdminInvoices, useAdminLeads } from "@/hooks/use-data"
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import {
  DollarSign, FolderKanban, Target, Headphones, TrendingUp, TrendingDown,
} from "lucide-react"

const revenueData = [
  { month: "Sep", revenue: 42000 }, { month: "Oct", revenue: 55000 },
  { month: "Nov", revenue: 48000 }, { month: "Dec", revenue: 62000 },
  { month: "Jan", revenue: 71000 }, { month: "Feb", revenue: 85000 },
]

const clientGrowthData = [
  { month: "Sep", new: 3, returning: 8 }, { month: "Oct", new: 5, returning: 9 },
  { month: "Nov", new: 4, returning: 10 }, { month: "Dec", new: 6, returning: 11 },
  { month: "Jan", new: 7, returning: 12 }, { month: "Feb", new: 8, returning: 13 },
]

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)"]

export default function DashboardPage() {
  const { company } = useAuth()
  
  // Use SWR hooks for real-time data
  const { data: clients = [], isLoading: clientsLoading } = useAdminClients()
  const { data: projects = [], isLoading: projectsLoading } = useAdminProjects()
  const { data: invoices = [], isLoading: invoicesLoading } = useAdminInvoices()
  const { data: leads = [], isLoading: leadsLoading } = useAdminLeads()
  
  const loading = clientsLoading || projectsLoading || invoicesLoading || leadsLoading

  const totalRevenue = invoices.filter((i: any) => i.status === "paid").reduce((acc: number, i: any) => acc + (i.total || 0), 0)
  const activeProjects = projects.filter((p: any) => p.status === "in-progress").length
  const newLeads = leads.filter((l: any) => l.status === "new" || l.status === "contacted").length
  const openTickets = 3

  const projectStatusData = [
    { name: "Planning", value: projects.filter((p: any) => p.status === "planning").length },
    { name: "In Progress", value: projects.filter((p: any) => p.status === "in-progress").length },
    { name: "Completed", value: projects.filter((p: any) => p.status === "completed").length },
  ].filter((d) => d.value > 0)

  const kpis = [
    { title: "Total Revenue", value: totalRevenue, prefix: "$", icon: DollarSign, trend: "+12.5%", up: true, color: "from-blue-600 to-blue-400" },
    { title: "Active Projects", value: activeProjects, icon: FolderKanban, trend: "+3", up: true, color: "from-emerald-600 to-emerald-400" },
    { title: "New Leads", value: newLeads, icon: Target, trend: "+8", up: true, color: "from-amber-600 to-amber-400" },
    { title: "Open Tickets", value: openTickets, icon: Headphones, trend: "-2", up: false, color: "from-rose-600 to-rose-400" },
  ]

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        description={`Welcome back! Here is your ${company.name} overview.`}
        breadcrumbs={[{ label: "Dashboard" }]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="relative overflow-hidden border-0 shadow-sm">
            <div className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-[0.06]`} />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">{kpi.title}</span>
                  <span className="text-2xl font-bold text-foreground">
                    <AnimatedCounter end={kpi.value} prefix={kpi.prefix} />
                  </span>
                </div>
                <div className={`flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${kpi.color} text-white`}>
                  <kpi.icon className="size-6" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs">
                {kpi.up ? (
                  <TrendingUp className="size-3 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <TrendingDown className="size-3 text-red-600 dark:text-red-400" />
                )}
                <span className={kpi.up ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-red-600 dark:text-red-400 font-medium"}>
                  {kpi.trend}
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Monthly Revenue</CardTitle>
            <CardDescription>Revenue trend over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: "var(--color-muted-foreground)" }} />
                <YAxis className="text-xs" tick={{ fill: "var(--color-muted-foreground)" }} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "8px", color: "var(--color-card-foreground)" }}
                  formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--color-chart-1)" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Project Status</CardTitle>
            <CardDescription>Current project distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "8px", color: "var(--color-card-foreground)" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Client Growth</CardTitle>
            <CardDescription>New vs returning clients</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clientGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" tick={{ fill: "var(--color-muted-foreground)" }} />
                <YAxis className="text-xs" tick={{ fill: "var(--color-muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: "8px", color: "var(--color-card-foreground)" }} />
                <Legend />
                <Bar dataKey="new" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} name="New Clients" />
                <Bar dataKey="returning" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} name="Returning" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <CardDescription>Latest actions across your workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {clients.length === 0 && projects.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No recent activity</p>
              ) : (
                <>
                  {clients.slice(0, 3).map((client: any) => (
                    <div key={client.id} className="flex items-start gap-3">
                      <Avatar className="size-8 shrink-0">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {client.name?.charAt(0) || "C"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="text-sm text-foreground leading-relaxed">
                          <span className="font-medium">{client.name}</span>{" "}
                          <span className="text-muted-foreground">was added as a client</span>
                        </p>
                        <span className="text-xs text-muted-foreground">{getRelativeTime(client.created_at)}</span>
                      </div>
                    </div>
                  ))}
                  {projects.slice(0, 3).map((project: any) => (
                    <div key={project.id} className="flex items-start gap-3">
                      <Avatar className="size-8 shrink-0">
                        <AvatarFallback className="text-xs bg-emerald-500/10 text-emerald-600">
                          P
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="text-sm text-foreground leading-relaxed">
                          <span className="font-medium">{project.name}</span>{" "}
                          <span className="text-muted-foreground">project was created</span>
                        </p>
                        <span className="text-xs text-muted-foreground">{getRelativeTime(project.created_at)}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
